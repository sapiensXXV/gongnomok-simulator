import { useCallback } from 'react'
import html2canvas from 'html2canvas'

/**
 * 강화된 아이템 박스(.item-info-section)를 PNG 이미지로 다운로드.
 *
 * - 캡쳐 대상은 호출 측에서 전달한 HTMLElement (forwardRef 로 보라 박스에 ref 부착)
 * - scale: 2 로 고해상도 (retina/SNS 공유 품질)
 * - backgroundColor: null 로 박스 자체 보라 배경을 그대로 보존
 */
export function useItemImageDownload() {
  return useCallback(async (element: HTMLElement | null, fileName: string) => {
    if (!element) return
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (err) {
      console.error('이미지 캡쳐 실패:', err)
    }
  }, [])
}
