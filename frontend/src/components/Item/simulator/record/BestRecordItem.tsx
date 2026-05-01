import { useEffect, useState } from 'react'

import RecordScrollSuccessCount from './RecordScrollSuccessCount'
import RecordTitle from './RecordTitle'
import RecordItemView from './RecordItemView'

import { BASE_URL } from '../../../../global/uri'
import { DEFAULT_ITEM_RECORD } from '../../../../global/item'
import axiosInstance from '../../../../global/axiosInstance'

export default function BestRecordItem({ itemId, info }) {
  const [enhanced, setEnhanced] = useState(DEFAULT_ITEM_RECORD)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axiosInstance
      .get(`${BASE_URL}/api/item/${itemId}/enhanced`)
      .then((res) => {
        setEnhanced(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }, [itemId])

  function getItemNameColor() {
    const iev = enhanced.iev
    if (iev >= 0 && iev <= 5) return 'orange'
    if (iev >= 6 && iev <= 22) return 'blue'
    if (iev >= 23 && iev <= 39) return 'purple'
    if (iev >= 40 && iev <= 56) return 'yellow'
    if (iev >= 57 && iev <= 73) return 'green'
    if (iev > 73) return 'primary-red'
    return 'white'
  }

  // 데이터 도착 전 — 스켈레톤
  if (!isLoaded || !info) return <BestRecordItemSkeleton />

  return (
    <main className="item-best-record-root bg-light mb-3 py-2 px-3">
      <RecordTitle name={enhanced?.name} tries={enhanced?.tries} />
      <RecordItemView
        recordInfo={info}
        enhanceInfo={enhanced}
        titleColorFunction={getItemNameColor}
        itemId={itemId}
      />
      <RecordScrollSuccessCount successInfo={enhanced.success} />
      <span className="item-record-comment">※ 기록은 아이템 정옵 기준으로 등록됩니다 ※</span>
      <span className="item-record-comment">※ 제작 확률이 낮을수록 높은 우선순위를 가집니다 ※</span>
    </main>
  )
}

function BestRecordItemSkeleton() {
  return (
    <main className="item-best-record-root bg-light mb-3 py-2 px-3">
      {/* "최고기록" 타이틀 자리 */}
      <span
        className="skeleton-line"
        style={{ width: 80, height: 18, margin: '4px auto', backgroundColor: 'rgba(0,0,0,0.06)' }}
      />
      {/* "OOO 님이 N 번의 시도로 만들어낸" 자리 */}
      <span
        className="skeleton-line"
        style={{
          width: '70%',
          height: 14,
          margin: '6px auto',
          backgroundColor: 'rgba(0,0,0,0.06)',
        }}
      />

      {/* 보라 박스 (RecordItemView) 자리 — 보라 배경 + 회색 줄 */}
      <div
        className="item-info-section mx-1"
        style={{
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: 16,
        }}
      >
        <span className="skeleton-line" style={{ width: '60%', height: 20, margin: '4px auto' }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
          <span className="skeleton-block" style={{ width: 70, height: 70 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="skeleton-line" style={{ width: '80%', height: 14 }} />
            ))}
          </div>
        </div>
        <span className="skeleton-line" style={{ width: '90%', height: 16, margin: '6px auto' }} />
        <hr />
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="skeleton-line"
            style={{ width: '55%', height: 14, margin: '0 auto' }}
          />
        ))}
      </div>

      {/* 주문서 카운트 자리 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 10 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="skeleton-block"
            style={{ width: 50, height: 36, backgroundColor: 'rgba(0,0,0,0.06)' }}
          />
        ))}
      </div>
    </main>
  )
}
