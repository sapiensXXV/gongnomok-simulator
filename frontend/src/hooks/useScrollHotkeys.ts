import { useHotkeys } from 'react-hotkeys-hook'
import type { RefObject } from 'react'

interface Binding {
  action: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

interface Args {
  q: Binding
  w: Binding
  e: Binding
  /** 혼돈의 주문서 */
  a: Binding
  /** 순백의 주문서 */
  s: Binding
  /** 수상한 큐브 */
  d: Binding
  /** 미라클 큐브 */
  f: Binding
  /** 강화 리셋 */
  r: Binding
  /** 구매기록 리셋 */
  v: Binding
}

/**
 * 시뮬레이터 단축키.
 *
 * Q/W/E: 10/60/100% 주문서
 * A/S:   혼돈/순백 주문서
 * D/F:   수상한/미라클 큐브
 * R:     강화 리셋
 * V:     구매기록 리셋
 *
 * 키다운 = 버튼 focus + action, 키업 = blur.
 */
export function useScrollHotkeys({ q, w, e, a, s, d, f, r, v }: Args): void {
  useHotkeys('q', () => { q.buttonRef.current?.focus(); q.action() }, { keydown: true, keyup: false })
  useHotkeys('q', () => q.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('w', () => { w.buttonRef.current?.focus(); w.action() }, { keydown: true, keyup: false })
  useHotkeys('w', () => w.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('e', () => { e.buttonRef.current?.focus(); e.action() }, { keydown: true, keyup: false })
  useHotkeys('e', () => e.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('a', () => { a.buttonRef.current?.focus(); a.action() }, { keydown: true, keyup: false })
  useHotkeys('a', () => a.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('s', () => { s.buttonRef.current?.focus(); s.action() }, { keydown: true, keyup: false })
  useHotkeys('s', () => s.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('d', () => { d.buttonRef.current?.focus(); d.action() }, { keydown: true, keyup: false })
  useHotkeys('d', () => d.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('f', () => { f.buttonRef.current?.focus(); f.action() }, { keydown: true, keyup: false })
  useHotkeys('f', () => f.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('r', () => { r.buttonRef.current?.focus(); r.action() }, { keydown: true, keyup: false })
  useHotkeys('r', () => r.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('v', () => { v.buttonRef.current?.focus(); v.action() }, { keydown: true, keyup: false })
  useHotkeys('v', () => v.buttonRef.current?.blur(), { keydown: false, keyup: true })
}
