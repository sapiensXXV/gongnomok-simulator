import { useEffect, useRef, useState } from 'react'
import axiosInstance from '../global/axiosInstance'
import { BASE_URL } from '../global/uri'
import { SCROLL_INFO, SCROLL_NAME_LIST } from '../global/scroll'
import type { ItemDetail } from '../types/item'
import type { ScrollInfo } from '../types/scroll'

interface Result {
  /** 서버에서 받은 원본 아이템 정보. (이후 수정 안 됨) */
  info: ItemDetail | null
  /** info 와 동일한 사본 — `BestRecordItem` 처럼 외부 컴포넌트에 그대로 넘기는 용도. */
  infoCopy: ItemDetail | null
  /** 이 카테고리에서 사용 가능한 주문서 목록. */
  availableScroll: ScrollInfo[]
}

/** GET /api/item/{id} 호출과 카테고리에 맞는 주문서 목록 계산을 한 곳에 캡슐화. */
export function useItemDetail(itemId: string | undefined): Result {
  const [info, setInfo] = useState<ItemDetail | null>(null)
  const [infoCopy, setInfoCopy] = useState<ItemDetail | null>(null)
  const availableScrollRef = useRef<ScrollInfo[]>([])

  useEffect(() => {
    if (!itemId) return
    let cancelled = false

    axiosInstance
      .get<ItemDetail>(`${BASE_URL}/api/item/${itemId}`)
      .then((res) => {
        if (cancelled) return
        const data = res.data
        setInfo(data)
        setInfoCopy({ ...data })

        const list: ScrollInfo[] = []
        for (const name of SCROLL_NAME_LIST) {
          const scroll = SCROLL_INFO.get(name)
          if (scroll && scroll.category === data.category) list.push(scroll)
        }
        availableScrollRef.current = list
      })
      .catch((e) => {
        // 네트워크 오류는 콘솔에만 — UI 는 빈 상태로 동작.
        console.error(e)
      })

    return () => {
      cancelled = true
    }
  }, [itemId])

  return {
    info,
    infoCopy,
    availableScroll: availableScrollRef.current,
  }
}
