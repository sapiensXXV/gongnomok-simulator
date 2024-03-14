export default function BestRecordItem({ itemId }) {
  return (
    <>
      <main className="item-best-record-root bg-leight mx-3 my-3 py-3 px-3">
      <section className="item-info-and-overflow-message">
            <section className="item-info-section-container">
              <section className="item-info-section mx-1">
                <span
                  className={`item-info-name ${getItemNameColor()}`}>
                  {info?.name}{upgradedCount != null && upgradedCount > 0 && `(+${upgradedCount})`}
                </span>
                <div className="item-info-basic">
                  <div className="item-img-container">
                    <img className='item-img' src={`/images/item/${itemId}.png`} />
                    <img ref={scrollAnimation} src={`/images/etc/empty.png`} className="scroll-animation" id="scroll-animation"></img>
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
                  {str > 0 && <span>STR : +{str}</span>}
                  {dex > 0 && <span>DEX : +{dex}</span>}
                  {intel > 0 && <span>INT : +{intel}</span>}
                  {luk > 0 && <span>LUK : +{luk}</span>}
                  {acc > 0 && <span>명중률 : +{acc}</span>}
                  {avo > 0 && <span>회피율 : +{avo}</span>}
                  {phyAtk > 0 && <span>공격력 : +{phyAtk}</span>}
                  {mgAtk > 0 && <span>마력 : +{mgAtk}</span>}
                  {phyDef > 0 && <span>물리방어력 : +{phyDef}</span>}
                  {mgDef > 0 && <span>마법방어력 : +{mgDef}</span>}
                  {hp > 0 && <span>HP : +{hp}</span>}
                  {mp > 0 && <span>MP : +{mp}</span>}
                  {move > 0 && <span>이동속도 : +{move}</span>}
                  {jump > 0 && <span>점프력 : +{jump}</span>}
                  {knockBackPercent > 0 && <span>직접 타격시 넉백 확률 : +{knockBackPercent}%</span>}
                  <span>업그레이드 가능 횟수 : {upgradable}</span>
                </div>
              </section>



            </section>
            <section className="overflow-message">
              {
                upgradable <= 0 && <span className="d-flex red scroll-overflow-msg">강화 횟수를 초과하였습니다</span>
              }
            </section>
          </section>
      </main>
    </>
  );
}