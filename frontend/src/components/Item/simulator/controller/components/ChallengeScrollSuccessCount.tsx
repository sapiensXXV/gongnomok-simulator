import { ASSETS_URL } from '../../../../../global/uri'
import type { SuccessScrollCount } from '../../../../../types/scroll'

interface Props {
  successInfo: SuccessScrollCount | undefined
}

export default function ChallengeScrollSuccessCount({ successInfo }: Props) {
  return (
    <section className="success-scroll-root">
      <div className="success-scroll-container">
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/10.png`} />
          <span> × {successInfo?.ten}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/60.png`} />
          <span> × {successInfo?.sixty}</span>
        </div>
        <div className="success-single-scroll-container">
          <img src={`${ASSETS_URL}/images/scroll/100.png`} />
          <span> × {successInfo?.hundred}</span>
        </div>
      </div>
    </section>
  )
}
