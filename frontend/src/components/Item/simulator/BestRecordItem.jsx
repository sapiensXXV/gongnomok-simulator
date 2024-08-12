import { useEffect, useState } from "react";

import RequiredStatus from "./RequiredStatus.jsx";
import axios from "axios";

import { BASE_URI } from "../../../global/uri.js";
import { ATTACK_SPEED, CATEGORY_NAME, DEFAULT_ITEM_RECORD } from "../../../global/item.js";

export default function BestRecordItem({ itemId, info }) {

  const [enhanced, setEnhanced] = useState(DEFAULT_ITEM_RECORD);
  const status = info?.status;

  useEffect(() => {
    // 기록 아이템 요청
    // 아직 기록이 없을 경우 서버에서 기본 데이터를 넘겨줌
    fetchRecordItem();
  }, [])

  function fetchRecordItem() {
    axios
      .get(`${BASE_URI}/api/item/${itemId}/enhanced`, { withCredentials: true })
      .then((res) => {
        setEnhanced(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getItemNameColor() {
    const iev = enhanced.iev;
    if (iev >= 0 && iev <= 5) {
      return 'orange';
    } else if (iev >= 6 && iev <= 22) {
      return 'blue';
    } else if (iev >= 23 && iev <= 39) {
      return 'purple'
    } else if (iev >= 40 && iev <= 56) {
      return 'yellow'
    } else if (iev >= 57 && iev <= 73) {
      return 'green'
    } else if (iev > 73) {
      return 'primary-red'
    }

    return 'white';
  }


  return (
    <>
      <main className="item-best-record-root bg-light mx-3 mb-3 py-2 px-3">
        <span className="item-best-record-title">최고기록{ enhanced?.name?.length > 0 && ` (이름: ${enhanced.name})`}</span>
        <div className="best-record-container">
          <section className="item-info-section-container black-border">
            <section className="item-info-section">
              <span
                className={`item-info-name ${getItemNameColor()}`}>
                {info?.name}{enhanced.success.total > 0 && `(+${enhanced.success.total})`}
              </span>
              <div className="item-info-basic">
                <div className="item-img-container">
                  <img className='item-img' src={`/images/item/${itemId}.png`} />
                </div>
                <div className="item-info-required">
                  <RequiredStatus name="LEV" value={info?.requiredStatus.level} />
                  <RequiredStatus name="STR" value={info?.requiredStatus.str} />
                  <RequiredStatus name="DEX" value={info?.requiredStatus.dex} />
                  <RequiredStatus name="INT" value={info?.requiredStatus.intel} />
                  <RequiredStatus name="LUK" value={info?.requiredStatus.luk} />
                  <RequiredStatus name="POP" value={info?.requiredStatus.pop} />

                  <span className="item-useless-info">ITEM LEV : -</span>
                  <span className="item-useless-info">ITEM EXP : -</span>

                </div>
              </div>
              <div className="item-info-job">
                <span className={info?.availableJob.common ? '' : 'red'}>초보자</span>
                <span className={info?.availableJob.warrior || info?.availableJob.common ? '' : 'red'}>전사</span>
                <span className={info?.availableJob.magician || info?.availableJob.common ? '' : 'red'}>마법사</span>
                <span className={info?.availableJob.bowman || info?.availableJob.common ? '' : 'red'} >궁수</span>
                <span className={info?.availableJob.thief || info?.availableJob.common ? '' : 'red'}>도적</span>
                <span className={info?.availableJob.common ? '' : 'red'}>해적</span>
              </div>
              <hr />

              <div className="item-info-status">
                <span>장비분류 : {CATEGORY_NAME.get(info?.category)}</span>
                {(info?.attackSpeed !== null && info?.attackSpeed !== 'NONE') && <span>공격속도 : {ATTACK_SPEED.get(info?.attackSpeed)}</span>}
                {status?.str.normal + enhanced.status.str > 0 && <span>STR : +{status?.str.normal + enhanced.status.str}</span>}
                {status?.dex.normal + enhanced.status.dex > 0 && <span>DEX : +{status?.dex.normal + enhanced.status.dex}</span>}
                {status?.intel.normal + enhanced.status.intel > 0 && <span>INT : +{status?.intel.normal + enhanced.status.intel}</span>}
                {status?.luk.normal + enhanced.status.luk > 0 && <span>LUK : +{status?.luk.normal + enhanced.status.luk}</span>}
                {status?.acc.normal + enhanced.status.acc > 0 && <span>명중률 : +{status?.acc.normal + enhanced.status.acc}</span>}
                {status?.avo.normal + enhanced.status.avo > 0 && <span>회피율 : +{status?.avo.normal + enhanced.status.avo}</span>}
                {status?.phyAtk.normal + enhanced.status.phyAtk > 0 && <span>공격력 : +{status?.phyAtk.normal + enhanced.status.phyAtk}</span>}
                {status?.mgAtk.normal + enhanced.status.mgAtk > 0 && <span>마력 : +{status?.mgAtk.normal + enhanced.status.mgAtk}</span>}
                {status?.phyDef.normal + enhanced.status.phyDef > 0 && <span>물리방어력 : +{status?.phyDef.normal + enhanced.status.phyDef}</span>}
                {status?.mgDef.normal + enhanced.status.mgDef > 0 && <span>마법방어력 : +{status?.mgDef.normal + enhanced.status.mgDef}</span>}
                {status?.hp.normal + enhanced.status.hp > 0 && <span>HP : +{status?.hp.normal + enhanced.status.hp}</span>}
                {status?.mp.normal + enhanced.status.mp > 0 && <span>MP : +{status?.mp.normal + enhanced.status.mp}</span>}
                {status?.move.normal + enhanced.status.move > 0 && <span>이동속도 : +{status?.move.normal + enhanced.status.move}</span>}
                {status?.jump.normal + enhanced.status.jump > 0 && <span>점프력 : +{status?.jump.normal + enhanced.status.jump}</span>}
                {info?.knockBackPercent > 0 && <span>직접 타격시 넉백 확률 : +{info?.knockBackPercent}%</span>}
                <span>업그레이드 가능 횟수 : 0</span>
              </div>
            </section>
          </section>
          
        </div>
        <section className="success-scroll-root">
          <div className="success-scroll-container">
            <div className="success-single-scroll-container">
              <img src={`/images/scroll/10.png`}></img>
              <span> × {enhanced.success.ten}</span>
            </div>
            <div className="success-single-scroll-container">
              <img src={`/images/scroll/60.png`}></img>
              <span> × {enhanced.success.sixty}</span>
            </div>
            <div className="success-single-scroll-container">
              <img src={`/images/scroll/100.png`}></img>
              <span> × {enhanced.success.hundred}</span>
            </div>
          </div>  
        </section>

        <span className="item-record-comment">※ 기록은 아이템 정옵 기준으로 등록됩니다</span>


      </main>
    </>
  );
}