import {ASSETS_URL} from "../../../../global/uri.js";

function RecordScrollSuccessCount({ successInfo }) {
  return (
    <>
      <section className="success-scroll-root">
        <div className="success-scroll-container">
          <div className="success-single-scroll-container">
            <img src={`${ASSETS_URL}/images/scroll/10.png`}></img>
            <span> × {successInfo?.ten}</span>
          </div>
          <div className="success-single-scroll-container">
            <img src={`${ASSETS_URL}/images/scroll/60.png`}></img>
            <span> × {successInfo?.sixty}</span>
          </div>
          <div className="success-single-scroll-container">
            <img src={`${ASSETS_URL}/images/scroll/100.png`}></img>
            <span> × {successInfo?.hundred}</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default RecordScrollSuccessCount;