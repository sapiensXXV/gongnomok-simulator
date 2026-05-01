#!/usr/bin/env node
/**
 * maplestory.io 에서 카테고리별 아이템을 일괄 추출해 bulk-register 입력 포맷으로 출력.
 *
 * 흐름:
 *   1) gms 카테고리 목록 (id, level, requiredJobs, typeInfo)
 *   2) kms 카테고리 목록 (id → 한글명)
 *   3) 각 id 별 gms 상세 (능력치, attackSpeed, tuc, 등)
 *   4) 우리 items.json 포맷으로 변환 (lower/upper = 0 으로 둠)
 *
 * 사용:
 *   node fetch-items.mjs --category KNUCKLE
 *   node fetch-items.mjs --category KNUCKLE,GUN --out items.json
 *   node fetch-items.mjs --category KNUCKLE --limit 5         # 처음 5개만 (테스트용)
 *   node fetch-items.mjs --category KNUCKLE --no-dedupe       # 중복 그대로 두기
 *   node fetch-items.mjs --category KNUCKLE --include-english # 한글명 없는 아이템도 포함
 *
 * 결과는 bulk-register.mjs 의 입력으로 그대로 사용 가능.
 * 변동치 (lower/upper) 는 0 — 필요한 만큼 수기 보정.
 *
 * 기본 정책:
 *   - Dedup ON: 이름이 같으면 가장 작은 id 만 남김 (maplestory.io 의 이벤트·
 *     재출시 변종 ID 들을 합침).
 *   - 한글명 없는 아이템은 제외: kms / kmst 어느 버전에도 등재되지 않은
 *     글로벌 전용 / 영문 한정 아이템은 한국 서버에 존재하지 않으므로 자동 skip.
 */

import { writeFileSync } from 'node:fs'

const REGION_GMS = 'gms'
const VERSION_GMS = '200'

const GMS_BASE = `https://maplestory.io/api/${REGION_GMS}/${VERSION_GMS}/item`

// 한글명 fallback 우선순위 — 최신 → 구버전 순.
// 최신 버전에 없는 아이템 (구버전에서 사라진 것) 은 구버전에서 채웁니다.
const KOREAN_SOURCES = [
  { region: 'kms', version: '389' },
  { region: 'kms', version: '335' },
  { region: 'kmst', version: '1149' },
]

const CONCURRENCY = 5

// 우리 ItemCategory ↔ maplestory.io subCategoryFilter 매핑
const CATEGORY_TO_SUBFILTER = {
  KNUCKLE: 'Knuckle',
  GUN: 'Gun',
  // PIRATE_OVERALL/TOP/BOTTOM 은 별도 처리 (Overall/Top/Bottom 중 Pirate 직업만)
}

const PIRATE_ARMOR_CATEGORIES = {
  PIRATE_OVERALL: 'Overall',
  PIRATE_TOP: 'Top',
  PIRATE_BOTTOM: 'Bottom',
}

function parseArgs(argv) {
  const out = { categories: [], limit: null, output: null, dedupe: true, includeEnglish: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--category') out.categories = argv[++i].split(',').map((s) => s.trim().toUpperCase())
    else if (a === '--out') out.output = argv[++i]
    else if (a === '--limit') out.limit = Number(argv[++i])
    else if (a === '--no-dedupe') out.dedupe = false
    else if (a === '--include-english') out.includeEnglish = true
    else if (a === '-h' || a === '--help') {
      console.log('사용: node fetch-items.mjs --category KNUCKLE,GUN [--out items.json] [--limit N] [--no-dedupe] [--include-english]')
      process.exit(0)
    }
  }
  if (out.categories.length === 0) {
    console.error('오류: --category 필수 (예: --category KNUCKLE,GUN)')
    process.exit(1)
  }
  return out
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

// 메이플 표준 직업 비트마스크 → 우리 jobs 배열
function jobMaskToJobs(mask) {
  if (mask === 0) return ['common']
  const jobs = []
  if (mask & 0x01) jobs.push('warrior')
  if (mask & 0x02) jobs.push('magician')
  if (mask & 0x04) jobs.push('bowman')
  if (mask & 0x08) jobs.push('thief')
  if (mask & 0x10) jobs.push('pirate')
  return jobs
}

// maplestory.io attackSpeed (1~9) → 우리 enum
function speedToEnum(n) {
  if (n == null) return 'NONE'
  if (n <= 2) return 'VERY_FAST'
  if (n <= 4) return 'FAST'
  if (n <= 6) return 'NORMAL'
  if (n <= 7) return 'SLOW'
  return 'VERY_SLOW'
}

// metaInfo 의 능력치 키 → 우리 stat 키
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

// metaInfo 의 required 키 → 우리 required 키
const REQ_KEY_MAP = {
  reqSTR: 'str',
  reqDEX: 'dex',
  reqINT: 'intel',
  reqLUK: 'luk',
  reqPOP: 'pop',
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.json()
}

/**
 * list endpoint 의 페이지 cap (500) 을 넘는 카테고리를 위해 startPosition 으로 페이지네이션.
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
      console.error(`    page fetch 실패 @start=${start}: ${e.message}`)
      break
    }
    if (!Array.isArray(page) || page.length === 0) break
    all.push(...page)
    if (page.length < PAGE) break
  }
  return all
}

async function fetchListGms(subCategory) {
  return fetchAllList('gms', '200', subCategory)
}

/**
 * 여러 한국어 리전·버전을 우선순위대로 fetch 해서 id → 한글명 맵을 구축.
 * 최신 버전에 있는 이름을 우선 채택; 누락된 id 는 구버전·테스트 서버에서 보충.
 */
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

async function fetchDetail(id) {
  return fetchJson(`${GMS_BASE}/${id}`)
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

/**
 * 한 카테고리에 대해 gms+kms 목록을 받고, 각 id 의 상세를 fetch.
 * 결과: 우리 items.json 포맷의 객체 배열.
 *
 * @param ourCategory     우리 ItemCategory 값 (KNUCKLE, GUN, PIRATE_OVERALL, ...)
 * @param subCategory     maplestory.io subCategoryFilter 값 (Knuckle, Gun, Overall, ...)
 * @param pirateOnly      true 면 requiredJobs 에 Pirate 만 있는 아이템만 (해적 방어구용)
 * @param limit           처음 N개로 제한 (테스트용)
 * @param includeEnglish  true 면 한글명 못 찾은 아이템도 포함, false 면 skip
 */
async function processCategory(ourCategory, subCategory, pirateOnly, limit, includeEnglish) {
  console.error(`\n[${ourCategory}] 목록 fetch 중 (subCategory=${subCategory})...`)
  const gmsList = await fetchListGms(subCategory)
  console.error(`  gms ${gmsList.length}개`)

  // 여러 한국어 버전 병합
  const koMap = await buildKoMap(subCategory)

  // 필터링
  let candidates = gmsList.filter((it) => typeof it.id === 'number')
  if (pirateOnly) {
    candidates = candidates.filter((it) => {
      const jobs = it.requiredJobs ?? []
      return Array.isArray(jobs) && jobs.length === 1 && jobs[0] === 'Pirate'
    })
    console.error(`  pirateOnly 필터 후: ${candidates.length}개`)
  }
  if (limit) candidates = candidates.slice(0, limit)

  console.error(`  상세 fetch (${candidates.length}개, 동시성 ${CONCURRENCY})...`)
  const details = await pool(candidates, CONCURRENCY, async (it, i) => {
    if ((i + 1) % 20 === 0) console.error(`    ${i + 1}/${candidates.length}`)
    return fetchDetail(it.id)
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
      // 어떤 kms 버전에도 등재되지 않은 아이템 — 한국 서버에 존재한 적 없는 글로벌 전용.
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

function toItemEntry(detail, summary, displayName, ourCategory) {
  const meta = detail.metaInfo ?? {}

  // 능력치 — 0 이 아닌 것만 포함
  const stats = {}
  for (const [src, dst] of Object.entries(STAT_KEY_MAP)) {
    const v = meta[src]
    if (typeof v === 'number' && v !== 0) stats[dst] = v
  }

  // 요구 능력치 — 0 이 아닌 것만 포함
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
    jobs: jobMaskToJobs(meta.reqJob ?? 0),
    attackSpeed: speedToEnum(meta.attackSpeed),
    upgradableCount: meta.tuc ?? 0,
    knockBackPercent: meta.knockBackPercent ?? 0,
    stats,
    ...(Object.keys(required).length > 0 && { required }),
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const allItems = []
  for (const cat of args.categories) {
    if (CATEGORY_TO_SUBFILTER[cat]) {
      const items = await processCategory(cat, CATEGORY_TO_SUBFILTER[cat], false, args.limit, args.includeEnglish)
      allItems.push(...items)
    } else if (PIRATE_ARMOR_CATEGORIES[cat]) {
      const items = await processCategory(cat, PIRATE_ARMOR_CATEGORIES[cat], true, args.limit, args.includeEnglish)
      allItems.push(...items)
    } else {
      console.error(`알 수 없는 카테고리: ${cat} (지원: ${[...Object.keys(CATEGORY_TO_SUBFILTER), ...Object.keys(PIRATE_ARMOR_CATEGORIES)].join(', ')})`)
      process.exit(1)
    }
  }

  let final = allItems
  if (args.dedupe) {
    final = dedupeItems(allItems)
    console.error(`\n=== 완료: ${allItems.length}개 → dedupe 후 ${final.length}개 ===`)
  } else {
    console.error(`\n=== 완료: 총 ${final.length}개 (dedupe 안 함) ===`)
  }
  // 변수 이름 변경 — 아래 코드에서 사용
  const result = final

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
