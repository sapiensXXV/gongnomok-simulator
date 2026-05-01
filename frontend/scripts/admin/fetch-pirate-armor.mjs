#!/usr/bin/env node
/**
 * 해적 방어구 (PIRATE_OVERALL / PIRATE_TOP / PIRATE_BOTTOM) 일괄 추출.
 *
 * fetch-items.mjs 와 동일한 흐름이지만 해적 방어구에 특화:
 *   - maplestory.io 의 Overall / Top / Bottom 카테고리에서
 *     `requiredJobs == ["Pirate"]` 인 아이템만 골라냄
 *   - 우리 카테고리는 PIRATE_OVERALL / PIRATE_TOP / PIRATE_BOTTOM 으로 매핑
 *
 * 사용:
 *   node fetch-pirate-armor.mjs --out armor.json
 *   node fetch-pirate-armor.mjs --out armor.json --limit 5
 *   node fetch-pirate-armor.mjs --part PIRATE_TOP --out top.json   # 특정 부위만
 *   node fetch-pirate-armor.mjs --no-dedupe --include-english
 *
 * 기본 정책 (fetch-items.mjs 와 동일):
 *   - 이름이 같으면 가장 작은 id 만 남김 (dedupe)
 *   - 한글명 못 찾은 아이템은 skip (--include-english 로 포함 가능)
 *   - 변동치 (lower/upper) 는 0 — 필요한 만큼 수기 보정
 *
 * 결과는 bulk-register.mjs 의 입력 그대로 사용 가능.
 */

import { writeFileSync } from 'node:fs'

const GMS_BASE = 'https://maplestory.io/api/gms/200/item'
const KOREAN_SOURCES = [
  { region: 'kms', version: '389' },
  { region: 'kms', version: '335' },
  { region: 'kmst', version: '1149' },
]
const CONCURRENCY = 5

// 우리 ItemCategory ↔ maplestory.io subCategoryFilter
const PART_MAP = {
  PIRATE_OVERALL: 'Overall',
  PIRATE_TOP: 'Top',
  PIRATE_BOTTOM: 'Bottom',
}

const STAT_KEY_MAP = {
  incSTR: 'str',
  incDEX: 'dex',
  incINT: 'intel',
  incLUK: 'luk',
  incPAD: 'phyAtk',
  incMAD: 'mgAtk',
  incPDD: 'phyDef',
  incMDD: 'mgDef',
  incACC: 'acc',
  incEVA: 'avo',
  incSpeed: 'move',
  incJump: 'jump',
  incMHP: 'hp',
  incMMP: 'mp',
}

const REQ_KEY_MAP = {
  reqSTR: 'str',
  reqDEX: 'dex',
  reqINT: 'intel',
  reqLUK: 'luk',
  reqPOP: 'pop',
}

function parseArgs(argv) {
  const out = {
    parts: Object.keys(PART_MAP), // 기본: 3부위 모두
    limit: null,
    output: null,
    dedupe: true,
    includeEnglish: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--part') out.parts = argv[++i].split(',').map((s) => s.trim().toUpperCase())
    else if (a === '--out') out.output = argv[++i]
    else if (a === '--limit') out.limit = Number(argv[++i])
    else if (a === '--no-dedupe') out.dedupe = false
    else if (a === '--include-english') out.includeEnglish = true
    else if (a === '-h' || a === '--help') {
      console.log('사용: node fetch-pirate-armor.mjs [--out armor.json] [--part PIRATE_OVERALL,PIRATE_TOP,PIRATE_BOTTOM] [--limit N] [--no-dedupe] [--include-english]')
      process.exit(0)
    }
  }
  for (const p of out.parts) {
    if (!PART_MAP[p]) {
      console.error(`알 수 없는 부위: ${p} (지원: ${Object.keys(PART_MAP).join(', ')})`)
      process.exit(1)
    }
  }
  return out
}

function speedToEnum(n) {
  if (n == null) return 'NONE'
  if (n <= 2) return 'VERY_FAST'
  if (n <= 4) return 'FAST'
  if (n <= 6) return 'NORMAL'
  if (n <= 7) return 'SLOW'
  return 'VERY_SLOW'
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.json()
}

/**
 * maplestory.io 의 list endpoint 는 한 페이지 당 최대 500개를 반환.
 * Overall/Top/Bottom 은 전 직업 아이템이 한 카테고리에 들어있어 수백 개 →
 * startPosition 으로 페이지네이션해서 끝까지 다 받기.
 */
async function fetchAllList(region, version, subCategory) {
  const PAGE = 500
  const all = []
  for (let start = 0; ; start += PAGE) {
    const url = `https://maplestory.io/api/${region}/${version}/item?overallCategoryFilter=Equip&subCategoryFilter=${subCategory}&startPosition=${start}&count=${PAGE}`
    let page
    try {
      page = await fetchJson(url)
    } catch (e) {
      // 페이지 fetch 실패 → 거기서 끊고 누적분 반환
      console.error(`    page fetch 실패 @start=${start}: ${e.message}`)
      break
    }
    if (!Array.isArray(page) || page.length === 0) break
    all.push(...page)
    if (page.length < PAGE) break // 마지막 페이지
  }
  return all
}

async function buildKoMap(subCategory) {
  const koMap = new Map()
  for (const src of KOREAN_SOURCES) {
    try {
      const list = await fetchAllList(src.region, src.version, subCategory)
      let added = 0
      for (const it of list) {
        if (typeof it.id !== 'number' || typeof it.name !== 'string') continue
        if (!koMap.has(it.id)) {
          koMap.set(it.id, it.name)
          added++
        }
      }
      console.error(`  ${src.region}/${src.version}: ${list.length}개 페치 → 신규 ${added}개 (누적 ${koMap.size})`)
    } catch (e) {
      console.error(`  ${src.region}/${src.version}: 실패 (${e.message})`)
    }
  }
  return koMap
}

async function pool(items, concurrency, fn) {
  const results = new Array(items.length)
  let idx = 0
  async function worker() {
    while (idx < items.length) {
      const i = idx++
      try {
        results[i] = await fn(items[i], i)
      } catch (e) {
        results[i] = { __error: e.message }
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

function toItemEntry(detail, summary, displayName, ourCategory) {
  const meta = detail.metaInfo ?? {}

  const stats = {}
  for (const [src, dst] of Object.entries(STAT_KEY_MAP)) {
    const v = meta[src]
    if (typeof v === 'number' && v !== 0) stats[dst] = v
  }

  const required = {}
  for (const [src, dst] of Object.entries(REQ_KEY_MAP)) {
    const v = meta[src]
    if (typeof v === 'number' && v !== 0) required[dst] = v
  }

  return {
    id: summary.id,
    name: displayName,
    level: meta.reqLevel ?? 0,
    category: ourCategory,
    jobs: ['pirate'], // pirateOnly 필터로 들어왔으므로 항상 해적
    attackSpeed: speedToEnum(meta.attackSpeed),
    upgradableCount: meta.tuc ?? 0,
    knockBackPercent: meta.knockBackPercent ?? 0,
    stats,
    ...(Object.keys(required).length > 0 && { required }),
  }
}

/** 이름이 같으면 최소 id 하나만 남김. */
function dedupeItems(items) {
  const seen = new Map()
  for (const it of items) {
    const existing = seen.get(it.name)
    if (!existing || it.id < existing.id) seen.set(it.name, it)
  }
  return [...seen.values()].sort((a, b) => a.id - b.id)
}

/**
 * 해적 방어구 한 부위에 대해 fetch + 필터 + 변환.
 *
 * @param ourCategory     PIRATE_OVERALL / PIRATE_TOP / PIRATE_BOTTOM
 * @param subCategory     maplestory.io 의 Overall / Top / Bottom
 * @param limit           처음 N개 (테스트용)
 * @param includeEnglish  true 면 한글명 없는 아이템도 포함
 */
async function processPart(ourCategory, subCategory, limit, includeEnglish) {
  console.error(`\n[${ourCategory}] 목록 fetch 중 (subCategory=${subCategory})...`)
  const gmsList = await fetchAllList('gms', '200', subCategory)
  console.error(`  gms ${gmsList.length}개 (페이지네이션)`)

  const koMap = await buildKoMap(subCategory)

  // 해적 전용만 필터 (requiredJobs == ["Pirate"])
  let candidates = gmsList.filter((it) => {
    if (typeof it.id !== 'number') return false
    const jobs = it.requiredJobs ?? []
    return Array.isArray(jobs) && jobs.length === 1 && jobs[0] === 'Pirate'
  })
  console.error(`  해적 전용 필터 후: ${candidates.length}개`)
  if (limit) candidates = candidates.slice(0, limit)

  console.error(`  상세 fetch (${candidates.length}개, 동시성 ${CONCURRENCY})...`)
  const details = await pool(candidates, CONCURRENCY, async (it, i) => {
    if ((i + 1) % 20 === 0) console.error(`    ${i + 1}/${candidates.length}`)
    return fetchJson(`${GMS_BASE}/${it.id}`)
  })

  const items = []
  let skippedNoKo = 0
  for (let i = 0; i < candidates.length; i++) {
    const summary = candidates[i]
    const detail = details[i]
    if (!detail || detail.__error) {
      console.error(`    skip id=${summary.id} (${detail?.__error ?? 'no detail'})`)
      continue
    }
    const koName = koMap.get(summary.id)
    if (!koName && !includeEnglish) {
      skippedNoKo++
      continue
    }
    items.push(toItemEntry(detail, summary, koName ?? summary.name, ourCategory))
  }
  if (skippedNoKo > 0) {
    console.error(`  한글명 없어서 skip: ${skippedNoKo}개 (--include-english 로 포함 가능)`)
  }
  return items
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const allItems = []
  for (const part of args.parts) {
    const subCategory = PART_MAP[part]
    const items = await processPart(part, subCategory, args.limit, args.includeEnglish)
    allItems.push(...items)
  }

  let result = allItems
  if (args.dedupe) {
    result = dedupeItems(allItems)
    console.error(`\n=== 완료: ${allItems.length}개 → dedupe 후 ${result.length}개 ===`)
  } else {
    console.error(`\n=== 완료: 총 ${result.length}개 (dedupe 안 함) ===`)
  }

  const json = JSON.stringify(result, null, 2)
  if (args.output) {
    writeFileSync(args.output, json)
    console.error(`→ ${args.output} 저장`)
  } else {
    process.stdout.write(json + '\n')
  }
}

main().catch((e) => {
  console.error('치명적 오류:', e)
  process.exit(1)
})
