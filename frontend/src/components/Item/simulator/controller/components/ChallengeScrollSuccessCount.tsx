import { ASSETS_URL } from '../../../../../global/uri'
import type { SuccessScrollCount } from '../../../../../types/scroll'

interface Props {
  successInfo: SuccessScrollCount | undefined
  /** 혼돈의 주문서 성공 횟수. */
  chaosSuccessCount: number
  /** 순백의 주문서 성공 횟수. */
  whiteSuccessCount: number
}

export default function ChallengeScrollSuccessCount({
  successInfo,
  chaosSuccessCount,
  whiteSuccessCount,
}: Props) {
  return (
    <section className="success-scroll-root">
      <div className="success-scroll-container">
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/10.png`} />
          <span> × {successInfo?.ten ?? 0}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/60.png`} />
          <span> × {successInfo?.sixty ?? 0}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/100.png`} />
          <span> × {successInfo?.hundred ?? 0}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/chaos.webp`} />
          <span> × {chaosSuccessCount}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/white.png`} />
          <span> × {whiteSuccessCount}</span>
        </div>
      </div>
    </section>
  )
}
