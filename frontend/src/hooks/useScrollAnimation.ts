import { useCallback, useEffect, useRef } from 'react'
import { ASSETS_URL } from '../global/uri'

const SUCCESS_GIF = `${ASSETS_URL}/images/etc/gif/success-150.gif`
const FAIL_GIF = `${ASSETS_URL}/images/etc/gif/failure-150.gif`
const TRANSPARENT = `${ASSETS_URL}/images/etc/empty.png`

const SUCCESS_DURATION_MS = 900
const FAIL_DURATION_MS = 600

/**
 * 강화 성공/실패 시 아이템 위에 잠깐 띄우는 GIF 애니메이션 제어.
 *
 * 호출 측에서 반환된 ref 를 <img> 에 붙이고, playSuccess/playFailure 를 호출.
 */
export function useScrollAnimation() {
  const imgRef = useRef<HTMLImageElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const play = useCallback((gifPath: string, durationMs: number) => {
    if (!imgRef.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    imgRef.current.src = gifPath
    timerRef.current = setTimeout(() => {
      if (imgRef.current) imgRef.current.src = TRANSPARENT
    }, durationMs)
  }, [])

  const playSuccess = useCallback(() => play(SUCCESS_GIF, SUCCESS_DURATION_MS), [play])
  const playFailure = useCallback(() => play(FAIL_GIF, FAIL_DURATION_MS), [play])

  // 언마운트 시 타이머 청소.
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  return { imgRef, playSuccess, playFailure, transparentSrc: TRANSPARENT }
}
