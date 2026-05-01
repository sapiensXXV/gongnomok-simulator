#!/usr/bin/env node
/**
 * 아이템 아이콘 일괄 다운로드 스크립트.
 *
 * 입력 JSON (items.json, armor.json 등) 의 id 들을 읽어서
 * maplestory.io 의 icon 엔드포인트에서 PNG 를 받아 frontend/public/images/item/{id}.png 로 저장.
 *
 * 사용:
 *   node download-images.mjs --input items.json,armor.json
 *   node download-images.mjs --input items.json --resize 4
 *   node download-images.mjs --ids 1482000,1492000
 *   node download-images.mjs --input armor.json --force         # 이미 있는 것도 다시 받기
 *   node download-images.mjs --input items.json --out-dir custom/path
 *
 * 기본 정책:
 *   - 이미 같은 이름 파일이 있으면 skip (--force 로 덮어쓰기)
 *   - 동시성 5
 *   - 4xx/5xx 응답은 skip 하고 계속 진행, 마지막에 실패 목록 표시
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
// 기본 저장 경로 — repo 의 frontend/public/images/item 으로 해석.
const DEFAULT_OUT_DIR = resolve(SCRIPT_DIR, '..', '..', 'public', 'images', 'item')

const GMS_BASE = 'https://maplestory.io/api/gms/200/item'
const CONCURRENCY = 5

function parseArgs(argv) {
  const out = {
    inputs: [],
    ids: [],
    outDir: DEFAULT_OUT_DIR,
    force: false,
    resize: 2,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--input') out.inputs = argv[++i].split(',').map((s) => s.trim()).filter(Boolean)
    else if (a === '--ids') out.ids = argv[++i].split(',').map((s) => Number(s.trim())).filter(Number.isFinite)
    else if (a === '--out-dir') out.outDir = resolve(argv[++i])
    else if (a === '--force') out.force = true
    else if (a === '--resize') out.resize = Number(argv[++i])
    else if (a === '-h' || a === '--help') {
      console.log('사용: node download-images.mjs (--input items.json,armor.json | --ids 1,2,3) [--out-dir path] [--force] [--resize N]')
      process.exit(0)
    }
  }
  if (out.inputs.length === 0 && out.ids.length === 0) {
    console.error('오류: --input 또는 --ids 필수')
    process.exit(1)
  }
  return out
}

function collectIds(args) {
  const set = new Set(args.ids)
  for (const path of args.inputs) {
    let raw
    try {
      raw = readFileSync(resolve(path), 'utf-8')
    } catch (e) {
      console.error(`오류: ${path} 읽기 실패 — ${e.message}`)
      process.exit(1)
    }
    let arr
    try {
      arr = JSON.parse(raw)
    } catch (e) {
      console.error(`오류: ${path} JSON 파싱 실패 — ${e.message}`)
      process.exit(1)
    }
    if (!Array.isArray(arr)) {
      console.error(`오류: ${path} 의 최상위가 배열이 아님`)
      process.exit(1)
    }
    for (const it of arr) {
      if (typeof it?.id === 'number') set.add(it.id)
    }
  }
  return [...set].sort((a, b) => a - b)
}

async function pool(items, concurrency, fn) {
  let idx = 0
  const stats = { ok: 0, skip: 0, fail: [] }
  async function worker() {
    while (idx < items.length) {
      const i = idx++
      await fn(items[i], i, stats)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return stats
}

async function downloadOne(id, args) {
  const outPath = join(args.outDir, `${id}.png`)
  if (!args.force && existsSync(outPath)) {
    return { status: 'skip', id }
  }

  const url = `${GMS_BASE}/${id}/icon?resize=${args.resize}`
  const res = await fetch(url)
  if (!res.ok) {
    return { status: 'fail', id, reason: `HTTP ${res.status}` }
  }
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(outPath, buf)
  return { status: 'ok', id, bytes: buf.length }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const ids = collectIds(args)

  if (ids.length === 0) {
    console.error('대상 ID 없음 — 종료')
    process.exit(1)
  }

  mkdirSync(args.outDir, { recursive: true })
  console.log(`총 ${ids.length}개 ID, 저장 위치: ${args.outDir}`)
  console.log(`동시성 ${CONCURRENCY}, resize=${args.resize}, force=${args.force}`)

  const stats = await pool(ids, CONCURRENCY, async (id, i, s) => {
    try {
      const r = await downloadOne(id, args)
      if (r.status === 'ok') {
        s.ok++
        if ((s.ok + s.skip) % 20 === 0) console.log(`  진행 ${s.ok + s.skip}/${ids.length}`)
      } else if (r.status === 'skip') {
        s.skip++
      } else {
        s.fail.push({ id, reason: r.reason })
        console.error(`  ERR id=${id} ${r.reason}`)
      }
    } catch (e) {
      s.fail.push({ id, reason: e.message })
      console.error(`  ERR id=${id} ${e.message}`)
    }
  })

  console.log('\n=== 요약 ===')
  console.log(`다운로드: ${stats.ok} / 스킵 (이미 있음): ${stats.skip} / 실패: ${stats.fail.length}`)
  if (stats.fail.length > 0) {
    console.log('실패 목록:')
    for (const f of stats.fail) console.log(`  - ${f.id}: ${f.reason}`)
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('치명적 오류:', e)
  process.exit(1)
})
