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
  r: Binding
  f: Binding
}

/**
 * 시뮬레이터 단축키 5개(Q/W/E/R/F) 등록을 한 번에.
 *
 * 키다운: 버튼에 focus + action 실행, 키업: blur.
 * 기존 useHotkeys 10번 호출을 한 호출로 축약.
 */
export function useScrollHotkeys({ q, w, e, r, f }: Args): void {
  useHotkeys('q', () => { q.buttonRef.current?.focus(); q.action() }, { keydown: true, keyup: false })
  useHotkeys('q', () => q.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('w', () => { w.buttonRef.current?.focus(); w.action() }, { keydown: true, keyup: false })
  useHotkeys('w', () => w.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('e', () => { e.buttonRef.current?.focus(); e.action() }, { keydown: true, keyup: false })
  useHotkeys('e', () => e.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('r', () => { r.buttonRef.current?.focus(); r.action() }, { keydown: true, keyup: false })
  useHotkeys('r', () => r.buttonRef.current?.blur(), { keydown: false, keyup: true })

  useHotkeys('f', () => { f.buttonRef.current?.focus(); f.action() }, { keydown: true, keyup: false })
  useHotkeys('f', () => f.buttonRef.current?.blur(), { keydown: false, keyup: true })
}
