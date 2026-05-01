#!/usr/bin/env node
/**
 * 해적 아이템 (또는 임의 아이템) 일괄 등록 스크립트.
 *
 * 사전 조건:
 *   1) 백엔드 ItemController 의 @AdminOnly 가 임시로 제거되어 있음
 *   2) 백엔드 서버가 로컬에서 8080 으로 떠있음
 *   3) 입력 JSON 파일 (--input items.json)
 *
 * 사용:
 *   node bulk-register.mjs --input items.json
 *   node bulk-register.mjs --input items.json --server http://localhost:8080
 *   node bulk-register.mjs --input items.json --dry-run
 *
 * 입력 포맷 (compact):
 *   [
 *     {
 *       "id": 1482000,
 *       "name": "너클아이언",
 *       "level": 10,
 *       "category": "KNUCKLE",
 *       "jobs": ["pirate"],          // common/warrior/bowman/magician/thief/pirate
 *       "attackSpeed": "NORMAL",
 *       "upgradableCount": 7,
 *       "knockBackPercent": 0,
 *       "stats": {
 *         // lower/upper 는 "정옵 대비 얼마나 떨어질·오를 수 있는지" 의 델타.
 *         //   ex) 정옵 17, 16~18 변동 → normal=17, lower=1, upper=1
 *         //       변동 없으면 lower=upper=0
 *         "phyAtk": 17,              // 단일 숫자 → {normal:17, lower:0, upper:0} (변동 없음)
 *         "str":    [4, 1],          // [normal, ±delta] → {normal:4, lower:1, upper:1}
 *         "dex":    [4, 1, 2]        // [normal, downDelta, upDelta] → {normal:4, lower:1, upper:2}
 *         // 또는 "phyAtk": { "normal": 17, "lower": 1, "upper": 1 } 명시
 *       },
 *       "required": { "dex": 25 }    // 0인 키는 생략 가능
 *     }
 *   ]
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// --- arg parsing -----------------------------------------------------------

function parseArgs(argv) {
  const out = { server: 'http://localhost:8080', input: null, dryRun: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--server') out.server = argv[++i]
    else if (a === '--input') out.input = argv[++i]
    else if (a === '--dry-run') out.dryRun = true
    else if (a === '-h' || a === '--help') {
      console.log('사용: node bulk-register.mjs --input items.json [--server http://localhost:8080] [--dry-run]')
      process.exit(0)
    }
  }
  if (!out.input) {
    console.error('오류: --input <items.json> 필수')
    process.exit(1)
  }
  return out
}

// --- payload normalization -------------------------------------------------

const ALL_STATS = [
  'str', 'dex', 'intel', 'luk',
  'phyAtk', 'mgAtk', 'phyDef', 'mgDef',
  'hp', 'mp', 'acc', 'avo', 'move', 'jump',
]

const ZERO_RANGE = { normal: 0, lower: 0, upper: 0 }

function normalizeStat(value) {
  // lower/upper 는 "정옵 대비 떨어질·오를 수 있는 델타" 입니다.
  //   ex) 정옵 17 이 16~18 로 변동 → lower=1, upper=1
  if (value == null) return { ...ZERO_RANGE }
  if (typeof value === 'number') {
    // 변동치 미지정 → 0
    return { normal: value, lower: 0, upper: 0 }
  }
  if (Array.isArray(value)) {
    // [normal, delta] — 대칭 변동 (lower=upper=delta)
    // [normal, downDelta, upDelta] — 비대칭 변동
    const [n, l = 0, u] = value
    return { normal: n, lower: l, upper: u ?? l }
  }
  if (typeof value === 'object') {
    return {
      normal: value.normal ?? 0,
      lower: value.lower ?? 0,
      upper: value.upper ?? 0,
    }
  }
  return { ...ZERO_RANGE }
}

function buildStatus(stats = {}) {
  const out = {}
  for (const key of ALL_STATS) out[key] = normalizeStat(stats[key])
  return out
}

function buildJobs(jobs = []) {
  const set = new Set(jobs)
  return {
    common: set.has('common'),
    warrior: set.has('warrior'),
    bowman: set.has('bowman'),
    magician: set.has('magician'),
    thief: set.has('thief'),
    pirate: set.has('pirate'),
  }
}

function buildRequired(req = {}) {
  return {
    level: req.level ?? 0,
    str: req.str ?? 0,
    dex: req.dex ?? 0,
    intel: req.intel ?? 0,
    luk: req.luk ?? 0,
    pop: req.pop ?? 0,
  }
}

function toPayload(item) {
  if (item.id == null) throw new Error(`id 필수: ${JSON.stringify(item)}`)
  if (!item.name) throw new Error(`name 필수: id=${item.id}`)
  if (!item.category) throw new Error(`category 필수: id=${item.id}`)

  return {
    id: item.id,
    name: item.name,
    availableJob: buildJobs(item.jobs),
    required: { ...buildRequired(item.required), level: item.level ?? item.required?.level ?? 0 },
    category: item.category,
    status: buildStatus(item.stats),
    upgradableCount: item.upgradableCount ?? 0,
    attackSpeed: item.attackSpeed ?? 'NONE',
    knockBackPercent: item.knockBackPercent ?? 0,
  }
}

// --- main ------------------------------------------------------------------

async function postOne(server, payload) {
  const res = await fetch(`${server}/api/item/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return { ok: res.ok, status: res.status, body: res.ok ? null : await res.text().catch(() => '') }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const raw = readFileSync(resolve(args.input), 'utf-8')
  const items = JSON.parse(raw)
  if (!Array.isArray(items)) {
    console.error('오류: 입력은 아이템 배열이어야 함')
    process.exit(1)
  }

  console.log(`총 ${items.length}개 아이템 처리 시작 (${args.dryRun ? 'DRY-RUN' : args.server})`)

  const ok = []
  const failed = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    let payload
    try {
      payload = toPayload(item)
    } catch (e) {
      console.error(`[${i + 1}/${items.length}] 변환 실패: ${e.message}`)
      failed.push({ id: item?.id, name: item?.name, error: e.message })
      continue
    }

    if (args.dryRun) {
      console.log(`[${i + 1}/${items.length}] DRY id=${payload.id} ${payload.name}`)
      ok.push({ id: payload.id, name: payload.name })
      continue
    }

    try {
      const r = await postOne(args.server, payload)
      if (r.ok) {
        console.log(`[${i + 1}/${items.length}] OK  id=${payload.id} ${payload.name}`)
        ok.push({ id: payload.id, name: payload.name })
      } else {
        // "Data truncated for column 'xxx'" 같은 컬럼명을 잘리지 않고 보기 위해 1500자까지.
        console.error(`[${i + 1}/${items.length}] ERR ${r.status} id=${payload.id} ${payload.name}\n${r.body?.slice(0, 1500) ?? ''}`)
        failed.push({ id: payload.id, name: payload.name, status: r.status, body: r.body })
      }
    } catch (e) {
      console.error(`[${i + 1}/${items.length}] 네트워크 에러 id=${payload.id}: ${e.message}`)
      failed.push({ id: payload.id, name: payload.name, error: e.message })
    }
  }

  console.log('\n=== 요약 ===')
  console.log(`성공: ${ok.length} / 실패: ${failed.length}`)
  if (failed.length > 0) {
    console.log('실패 항목:')
    for (const f of failed) console.log(`  - id=${f.id} ${f.name ?? ''} ${f.status ?? f.error ?? ''}`)
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('치명적 오류:', e)
  process.exit(1)
})
