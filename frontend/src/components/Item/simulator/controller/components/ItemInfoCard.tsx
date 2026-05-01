import { type RefObject } from 'react'
import { ASSETS_URL } from '../../../../../global/uri'
import { ATTACK_SPEED, CATEGORY_NAME } from '../../../../../global/item'
import RequiredStatus from './RequiredStatus'
import type { ItemDetail, StatusKey } from '../../../../../types/item'

interface Props {
  itemId: string | undefined
  info: ItemDetail | null
  /** 표시될 능력치 (강화 결과 포함). */
  current: Record<StatusKey, number>
  upgradable: number
  upgradedCount: number
  knockBackPercent: number
  /** 아이템 이름 색상 (IEV 기준). */
  nameColor: string
  /** 강화 GIF 가 그려질 img 의 ref. */
  scrollAnimationRef: RefObject<HTMLImageElement | null>
  /** 강화 시작 전 default src (투명 png). */
  transparentSrc: string
}

/** 시뮬레이터 좌측 보라색 아이템 정보 카드. (디자인 보존 영역) */
export default function ItemInfoCard({
  itemId,
  info,
  current,
  upgradable,
  upgradedCount,
  knockBackPercent,
  nameColor,
  scrollAnimationRef,
  transparentSrc,
}: Props) {
  return (
    <section className="item-info-section-container">
      <section className="item-info-section mx-1">
        <span className={`item-info-name ${nameColor}`}>
          {info?.name}
          {upgradedCount > 0 && `(+${upgradedCount})`}
        </span>

        <div className="item-info-basic">
          <div className="item-img-container">
            <img className="item-img" src={`${ASSETS_URL}/images/item/${itemId}.png`} />
            <img
              ref={scrollAnimationRef}
              src={transparentSrc}
              className="scroll-animation"
              id="scroll-animation"
            />
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
          <span className={info?.availableJob.bowman || info?.availableJob.common ? '' : 'red'}>궁수</span>
          <span className={info?.availableJob.thief || info?.availableJob.common ? '' : 'red'}>도적</span>
          <span className={info?.availableJob.common ? '' : 'red'}>해적</span>
        </div>

        <hr />

        <div className="item-info-status">
          <span>장비분류 : {info && CATEGORY_NAME.get(info.category)}</span>
          {info?.attackSpeed && info.attackSpeed !== 'NONE' && (
            <span>공격속도 : {ATTACK_SPEED.get(info.attackSpeed)}</span>
          )}
          {current.str > 0 && <span>STR : +{current.str}</span>}
          {current.dex > 0 && <span>DEX : +{current.dex}</span>}
          {current.intel > 0 && <span>INT : +{current.intel}</span>}
          {current.luk > 0 && <span>LUK : +{current.luk}</span>}
          {current.acc > 0 && <span>명중률 : +{current.acc}</span>}
          {current.avo > 0 && <span>회피율 : +{current.avo}</span>}
          {current.phyAtk > 0 && <span>공격력 : +{current.phyAtk}</span>}
          {current.mgAtk > 0 && <span>마력 : +{current.mgAtk}</span>}
          {current.phyDef > 0 && <span>물리방어력 : +{current.phyDef}</span>}
          {current.mgDef > 0 && <span>마법방어력 : +{current.mgDef}</span>}
          {current.hp > 0 && <span>HP : +{current.hp}</span>}
          {current.mp > 0 && <span>MP : +{current.mp}</span>}
          {current.move > 0 && <span>이동속도 : +{current.move}</span>}
          {current.jump > 0 && <span>점프력 : +{current.jump}</span>}
          {knockBackPercent > 0 && (
            <span>직접 타격시 넉백 확률 : +{knockBackPercent}%</span>
          )}
          <span>업그레이드 가능 횟수 : {upgradable}</span>
        </div>
      </section>
    </section>
  )
}
