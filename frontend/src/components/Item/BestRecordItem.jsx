import { useEffect, useState } from "react";

import RequiredStatus from "./RequiredStatus";
import axios from "axios";

import { BASE_URI } from "../../global/uri";
import { ATTACK_SPEED, CATEGORY_NAME, DEFAULT_ITEM_RECORD } from "../../global/item";

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
        console.log(res);
        setEnhanced(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getItemNameColor() {
    const iev = enhanced.iev;
    if (iev >= 0 && iev <= 5) {
      return 'white';
    } else if (iev >= 6 && iev <= 22) {
      return 'blue';
    } else if (iev >= 23 && iev <= 39) {
      return 'purple'
    } else if (iev >= 40 && iev <= 56) {
      return 'yellow'
    } else if (iev >= 57 && iev <= 73) {
      return 'green'
    }

    return 'white';
  }


  return (
    <>
      <main className="item-best-record-root bg-light mx-3 my-3 py-2 px-3">
        <span className="item-best-record-title">최고기록</span>
        <div className="best-record-container">
          <section className="item-info-section-container black-border">
            <section className="item-info-section">
              <span
                className={`item-info-name ${getItemNameColor()}`}>
                {info?.name}{enhanced.successCount > 0 && ` (+${enhanced.successCount})`}
              </span>
              <div className="item-info-basic">
                <div className="item-img-container">
                  <img className='item-img' src={`/images/item/${itemId}.png`} />
                </div>
                <div className="item-info-required">
                  <RequiredStatus name="LEV" value={info?.required.level} />
                  <RequiredStatus name="STR" value={info?.required.str} />
                  <RequiredStatus name="DEX" value={info?.required.dex} />
                  <RequiredStatus name="INT" value={info?.required.intel} />
                  <RequiredStatus name="LUK" value={info?.required.luk} />
                  <RequiredStatus name="POP" value={info?.required.pop} />

                  <span className="item-useless-info">ITEM LEV : -</span>
                  <span className="item-useless-info">ITEM EXP : -</span>

                </div>
              </div>
              <div className="item-info-job">
                <span className={info?.job.common ? '' : 'red'}>초보자</span>
                <span className={info?.job.warrior || info?.job.common ? '' : 'red'}>전사</span>
                <span className={info?.job.magician || info?.job.common ? '' : 'red'}>마법사</span>
                <span className={info?.job.bowman || info?.job.common ? '' : 'red'} >궁수</span>
                <span className={info?.job.thief || info?.job.common ? '' : 'red'}>도적</span>
                <span className={info?.job.common ? '' : 'red'}>해적</span>
              </div>
              <hr />

              <div className="item-info-status">
                <span>장비분류 : {CATEGORY_NAME.get(info?.category)}</span>
                {info?.attackSpeed != null && <span>공격속도 : {ATTACK_SPEED.get(info?.attackSpeed)}</span>}
                {status?.str.normal + enhanced.str > 0 && <span>STR : +{status?.str.normal + enhanced.str}</span>}
                {status?.dex.normal + enhanced.dex > 0 && <span>DEX : +{status?.dex.normal + enhanced.dex}</span>}
                {status?.intel.normal + enhanced.intel > 0 && <span>INT : +{status?.intel.normal + enhanced.intel}</span>}
                {status?.luk.normal + enhanced.luk > 0 && <span>LUK : +{status?.luk.normal + enhanced.luk}</span>}
                {status?.acc.normal + enhanced.acc > 0 && <span>명중률 : +{status?.acc.normal + enhanced.acc}</span>}
                {status?.avo.normal + enhanced.avo > 0 && <span>회피율 : +{status?.avo.normal + enhanced.avo}</span>}
                {status?.phyAtk.normal + enhanced.phyAtk > 0 && <span>공격력 : +{status?.phyAtk.normal + enhanced.phyAtk}</span>}
                {status?.mgAtk.normal + enhanced.mgAtk > 0 && <span>마력 : +{status?.mgAtk.normal + enhanced.mgAtk}</span>}
                {status?.phyDef.normal + enhanced.phyDef > 0 && <span>물리방어력 : +{status?.phyDef.normal + enhanced.phyDef}</span>}
                {status?.mgDef.normal + enhanced.mgDef > 0 && <span>마법방어력 : +{status?.mgDef.normal + enhanced.mgDef}</span>}
                {status?.hp.normal + enhanced.hp > 0 && <span>HP : +{status?.hp.normal + enhanced.hp}</span>}
                {status?.mp.normal + enhanced.mp > 0 && <span>MP : +{status?.mp.normal + enhanced.mp}</span>}
                {status?.move.normal + enhanced.move > 0 && <span>이동속도 : +{status?.move.normal + enhanced.move}</span>}
                {status?.jump.normal + enhanced.jump > 0 && <span>점프력 : +{status?.jump.normal + enhanced.jump}</span>}
                {info?.knockBackPercent > 0 && <span>직접 타격시 넉백 확률 : +{info?.knockBackPercent}%</span>}
                <span>업그레이드 가능 횟수 : 0</span>
              </div>
            </section>
          </section>
        </div>


      </main>
    </>
  );
}