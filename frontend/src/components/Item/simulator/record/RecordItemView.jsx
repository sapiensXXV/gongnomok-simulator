import RequiredStatus from "../controller/components/RequiredStatus.jsx";
import {ATTACK_SPEED, CATEGORY_NAME} from "../../../../global/item.js";
import {CDN_URL} from "../../../../global/uri.js";

function RecordItemView({ recordInfo, enhanceInfo, titleColorFunction, itemId }) {
  return (
    <>
      <div className="best-record-container">
        <section className="item-info-section-container black-border">
          <section className="item-info-section">
              <span
                className={`item-info-name ${titleColorFunction()}`}>
                {recordInfo?.name}{enhanceInfo.success.total > 0 && `(+${enhanceInfo.success.total})`}
              </span>
            <div className="item-info-basic">
              <div className="item-img-container">
                <img className='item-img' src={`${CDN_URL}/images/item/${itemId}.png`}/>
              </div>
              <div className="item-info-required">
                <RequiredStatus name="LEV" value={recordInfo?.requiredStatus.level}/>
                <RequiredStatus name="STR" value={recordInfo?.requiredStatus.str}/>
                <RequiredStatus name="DEX" value={recordInfo?.requiredStatus.dex}/>
                <RequiredStatus name="INT" value={recordInfo?.requiredStatus.intel}/>
                <RequiredStatus name="LUK" value={recordInfo?.requiredStatus.luk}/>
                <RequiredStatus name="POP" value={recordInfo?.requiredStatus.pop}/>

                <span className="item-useless-info">ITEM LEV : -</span>
                <span className="item-useless-info">ITEM EXP : -</span>

              </div>
            </div>
            <div className="item-info-job">
              <span className={recordInfo?.availableJob.common ? '' : 'red'}>초보자</span>
              <span className={recordInfo?.availableJob.warrior || recordInfo?.availableJob.common ? '' : 'red'}>전사</span>
              <span className={recordInfo?.availableJob.magician || recordInfo?.availableJob.common ? '' : 'red'}>마법사</span>
              <span className={recordInfo?.availableJob.bowman || recordInfo?.availableJob.common ? '' : 'red'}>궁수</span>
              <span className={recordInfo?.availableJob.thief || recordInfo?.availableJob.common ? '' : 'red'}>도적</span>
              <span className={recordInfo?.availableJob.common ? '' : 'red'}>해적</span>
            </div>
            <hr/>

            <div className="item-info-status">
              <span>장비분류 : {CATEGORY_NAME.get(recordInfo?.category)}</span>
              {(recordInfo?.attackSpeed !== null && recordInfo?.attackSpeed !== 'NONE') &&
                <span>공격속도 : {ATTACK_SPEED.get(recordInfo?.attackSpeed)}</span>}
              {recordInfo?.status?.str.normal + enhanceInfo.status.str > 0 &&
                <span>STR : +{recordInfo?.status?.str.normal + enhanceInfo.status.str}</span>}
              {recordInfo?.status?.dex.normal + enhanceInfo.status.dex > 0 &&
                <span>DEX : +{recordInfo?.status?.dex.normal + enhanceInfo.status.dex}</span>}
              {recordInfo?.status?.intel.normal + enhanceInfo.status.intel > 0 &&
                <span>INT : +{recordInfo?.status?.intel.normal + enhanceInfo.status.intel}</span>}
              {recordInfo?.status?.luk.normal + enhanceInfo.status.luk > 0 &&
                <span>LUK : +{recordInfo?.status?.luk.normal + enhanceInfo.status.luk}</span>}
              {recordInfo?.status?.acc.normal + enhanceInfo.status.acc > 0 &&
                <span>명중률 : +{recordInfo?.status?.acc.normal + enhanceInfo.status.acc}</span>}
              {recordInfo?.status?.avo.normal + enhanceInfo.status.avo > 0 &&
                <span>회피율 : +{recordInfo?.status?.avo.normal + enhanceInfo.status.avo}</span>}
              {recordInfo?.status?.phyAtk.normal + enhanceInfo.status.phyAtk > 0 &&
                <span>공격력 : +{recordInfo?.status?.phyAtk.normal + enhanceInfo.status.phyAtk}</span>}
              {recordInfo?.status?.mgAtk.normal + enhanceInfo.status.mgAtk > 0 &&
                <span>마력 : +{recordInfo?.status?.mgAtk.normal + enhanceInfo.status.mgAtk}</span>}
              {recordInfo?.status?.phyDef.normal + enhanceInfo.status.phyDef > 0 &&
                <span>물리방어력 : +{recordInfo?.status?.phyDef.normal + enhanceInfo.status.phyDef}</span>}
              {recordInfo?.status?.mgDef.normal + enhanceInfo.status.mgDef > 0 &&
                <span>마법방어력 : +{recordInfo?.status?.mgDef.normal + enhanceInfo.status.mgDef}</span>}
              {recordInfo?.status?.hp.normal + enhanceInfo.status.hp > 0 &&
                <span>HP : +{recordInfo?.status?.hp.normal + enhanceInfo.status.hp}</span>}
              {recordInfo?.status?.mp.normal + enhanceInfo.status.mp > 0 &&
                <span>MP : +{recordInfo?.status?.mp.normal + enhanceInfo.status.mp}</span>}
              {recordInfo?.status?.move.normal + enhanceInfo.status.move > 0 &&
                <span>이동속도 : +{recordInfo?.status?.move.normal + enhanceInfo.status.move}</span>}
              {recordInfo?.status?.jump.normal + enhanceInfo.status.jump > 0 &&
                <span>점프력 : +{recordInfo?.status?.jump.normal + enhanceInfo.status.jump}</span>}
              {recordInfo?.knockBackPercent > 0 && <span>직접 타격시 넉백 확률 : +{recordInfo?.knockBackPercent}%</span>}
              <span>업그레이드 가능 횟수 : 0</span>
            </div>
          </section>
        </section>

      </div>
    </>
  )
}

export default RecordItemView;