
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { initSimulatorEvent } from '../../global/event';

import { INIT_ITEM_INFO, CATEGORY_NAME, ATTACK_SPEED } from "/src/global/item.js";
import { SCROLL_NAME_LIST, SCROLL_INFO } from "../../global/scroll";
import Scroll from "./Scroll";
import PriceCalculator from "./PriceCalculator";

import { playFailureSound, playSuccessSound, playPurchaseSound } from "../../global/util/soundPlay";
import { playFailureEffect, playSuccessEffect } from "../../global/util/animationPlay";
import OptionSelect from "./OptionalSelect";
import RequiredStatus from "./RequiredStatus";



export default function ItemSimulator() {

  const { itemId } = useParams();

  const [info, setInfo] = useState(INIT_ITEM_INFO); // 아이템 정보
  const [upgradedCount, setUpgradedCount] = useState(0);

  //능력치
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [intel, setIntel] = useState(0);
  const [luk, setLuk] = useState(0);
  const [phyAtk, setPhyAtk] = useState(0);
  const [mgAtk, setMgAtk] = useState(0);
  const [phyDef, setPhyDef] = useState(0);
  const [mgDef, setMgDef] = useState(0);
  const [acc, setAcc] = useState(0);
  const [avo, setAvo] = useState(0);
  const [move, setMove] = useState(0);
  const [jump, setJump] = useState(0);
  const [hp, setHp] = useState(0);
  const [mp, setMp] = useState(0);
  const [upgradableCount, setUpgradableCount] = useState(0);

  // 기본 값
  let defaultStr = useRef(0);
  let defaultDex = useRef(0);
  let defaultIntel = useRef(0);
  let defaultLuk = useRef(0);
  let defaultPhyAtk = useRef(0);
  let defaultMgAtk = useRef(0);
  let defaultPhyDef = useRef(0);
  let defaultMgDef = useRef(0);
  let defaultAcc = useRef(0);
  let defaultAvo = useRef(0);
  let defaultMove = useRef(0);
  let defaultJump = useRef(0);
  let defaultHp = useRef(0);
  let defaultMp = useRef(0);

  const [needReset, setNeedReset] = useState(false);

  const [defaultUpgradableCount, setDefaultUpgradableCount] = useState(0);
  const [currentScroll, setCurrentScroll] = useState('WAND_MG_ATK');

  // 가격관련 변수
  const [itemPrice, setItemPrice] = useState(0); // 아이템 가격
  const [scroll10Price, setScroll10Price] = useState(0); //10% 주문서 가격
  const [scroll60Price, setScroll60Price] = useState(0); // 60% 주문서 가격
  const [scroll100Price, setScroll100Price] = useState(0); // 100% 주문서 가격

  const [itemBuyCount, setItemBuyCount] = useState(1); // 구매 아이템 갯수
  const [scroll10BuyCount, setScroll10BuyCount] = useState(0); // 10% 주문서 구매 갯수
  const [scroll60BuyCount, setScroll60BuyCount] = useState(0); // 60% 주문서 구매 갯수
  const [scroll100BuyCount, setScroll100BuyCount] = useState(0); // 100% 주문서 구매 갯수

  const [scroll10SuccessCount, setScroll10SuccessCount] = useState(0); // 10% 주문서 성공 갯수
  const [scroll60SuccessCount, setScroll60SuccessCount] = useState(0); // 60% 주문서 성공 갯수
  const [scroll100SuccessCount, setScroll100SuccessCount] = useState(0); // 100%주문서 성공 갯수

  // 아이템정보를 가져온다.
  useEffect(() => {
    axios
      .get(`/api/item/${itemId}`)
      .then((res) => {

        setInfo(res.data);
        const status = res.data.status;
        console.log(`status=${status.dex.normal}`)
        setInit(status);
        setUpgradableCount(res.data.upgradableCount);
        setDefaultUpgradableCount(res.data.upgradableCount);
      })
      .catch((err) => {
        console.log(err);
      })

      //이벤트 등록
      initSimulatorEvent();

  }, []);


  function setInit(status) {
    setStr(status.str.normal);
    setDex(status.dex.normal);
    setIntel(status.intel.normal);
    setLuk(status.luk.normal);
    setPhyAtk(status.phyAtk.normal);
    setMgAtk(status.mgAtk.normal);
    setPhyDef(status.phyDef.normal);
    setMgDef(status.mgDef.normal);
    setAcc(status.acc);
    setAvo(status.avo);
    setMove(status.move);
    setJump(status.jump);
    setHp(status.hp.normal);
    setMp(status.mp.normal);

    defaultStr.current = status.str.normal;
    defaultDex.current = status.dex.normal;
    defaultIntel.current = status.intel.normal;
    defaultLuk.current = status.luk.normal;
    defaultPhyAtk.current = status.phyAtk.normal;
    defaultMgAtk.current = status.mgAtk.normal;
    defaultPhyDef.current = status.phyDef.normal;
    defaultAcc.current = status.acc;
    defaultAvo.current = status.avo;
    defaultMove.current = status.move;
    defaultJump.current = status.jump;
    defaultHp.current = status.hp.normal;
    defaultMp.current = status.mp.normal;

    console.log('초기화 이후')
    console.log(`defaultDex=${defaultDex.current}`);
    console.log(`defaultPhyAtk=${defaultPhyAtk.current}`)

  }

  // 주문서 선택 핸들러
  const handleScrollChange = (e) => {
    setCurrentScroll(e.target.value);
    console.log(`current scroll=${e.target.value}`);
  }

  // 주문서 버튼 클릭 핸들러
  const handleScrollClicked = (percent) => {

    if (!checkValidate()) {
      return;
    }

    // 능력치 증가 시켜야함
    const info = SCROLL_INFO.get(currentScroll);
    let upgradeInfo = null;
    if (percent === 10) {
      upgradeInfo = info.upgradeValue._10;
      setScroll10BuyCount(scroll10BuyCount + 1);
    } else if (percent === 60) {
      upgradeInfo = info.upgradeValue._60;
      setScroll60BuyCount(scroll60BuyCount + 1);
    } else if (percent === 100) {
      upgradeInfo = info.upgradeValue._100;
      setScroll100BuyCount(scroll100BuyCount + 1);
    }

    if (rollScroll(percent)) {
      scrollSuccess(upgradeInfo);
      if (percent === 10) setScroll10SuccessCount(scroll10SuccessCount + 1);
      else if (percent === 60) setScroll60SuccessCount(scroll60SuccessCount + 1);
      else if (percent === 100) setScroll100SuccessCount(scroll100SuccessCount + 1);
    } else {
      scrollFail();
    }
    setUpgradableCount(upgradableCount - 1);
  }

  const checkValidate = () => {
    //주문서를 더 적용할 수 있는지 검사
    if (upgradableCount <= 0) {
      console.log('리셋버튼을 눌러주세요')
      setNeedReset(true);
      return false;
    }

    //더이상 적용할 수 없다는 메세지 출력,
    //함수의 반환결과를 받은 쪽은 그대로 리턴된다.
    return true;
  }

  const rollScroll = (percent) => {
    const count = percent / 10;
    let result = Math.floor(Math.random() * 10 + 1);
    if (result >= 1 && result <= count) return true;
    else return false;
  }

  const scrollSuccess = (upgradeInfo) => {
    //주문서 성공
    console.log('success')
    playSuccessSound();
    playSuccessEffect();
    upgradeInfo.map((info) => {
      switch (info.name) {
        case 'str':
          setStr(str + info.value)
          break;
        case 'dex':
          setDex(dex + info.value)
          break;
        case 'intel':
          setIntel(intel + info.value)
          break;
        case 'luk':
          setLuk(luk + info.value)
          break;
        case 'phyAtk':
          setPhyAtk(phyAtk + info.value)
          break;
        case 'mgAtk':
          setMgAtk(mgAtk + info.value)
          break;
        case 'phyDef':
          setPhyDef(phyDef + info.value)
          break;
        case 'mgDef':
          setMgDef(mgDef + info.value)
          break;
        case 'acc':
          setAcc(acc + info.value)
          break;
        case 'avo':
          setAvo(avo + info.value)
          break;
        case 'move':
          setMove(move + info.value)
          break;
        case 'jump':
          setJump(jump, info.value)
          break;
        case 'hp':
          setHp(hp + info.value)
          break;
        case 'mp':
          setMp(mp + info.value)
          break;
      }
    })

    setUpgradedCount(upgradedCount + 1);
  }

  const scrollFail = () => {
    //주문서 실패
    playFailureSound();
    playFailureEffect();
    console.log('fail')
  }

  const itemPriceChangeHandler = (e) => {
    console.log('아이템 가격 변경')
    setItemPrice(e.target.value);
  }

  const scroll10PriceChangeHandler = (e) => {
    setScroll10Price(e.target.value)
  }

  const scroll60PriceChangeHandler = (e) => {
    setScroll60Price(e.target.value)
  }

  const scroll100PriceChangeHandler = (e) => {
    setScroll100Price(e.target.value)
  }

  const handleItemOption = (e, statusName) => {
    const name = statusName;
    const value = e.target.value
    console.log(`name=${name}, value=${value}`)

    switch (name) {
      case 'str':
        defaultStr.current = value;
        break;
      case 'dex':
        console.log(`defaultDex값을 ${defaultDex.current} => ${value}`)
        defaultDex.current = value;
        console.log(`변경 후 defaultDex=${defaultDex.current}`)
        break;
      case 'intel':
        defaultIntel.current = value;
        break;
      case 'luk':
        defaultLuk.current = value;
        break;
      case 'phyAtk':
        defaultPhyAtk.current = value;
        break;
      case 'mgAtk':
        defaultMgAtk.current = value;
        break;
      case 'phyDef':
        defaultPhyDef.current = value;
        break;
      case 'mgDef':
        defaultMgDef.current = value;
        break;
      case 'hp':
        defaultHp.current = value;
        break;
      case 'mp':
        defaultMp.current = value;
        break;
    }
    resetItem();
  }

  function resetItem() {    
    setNeedReset(false);

    setStr(defaultStr.current);
    setDex(defaultDex.current);
    setIntel(defaultIntel.current);
    setLuk(defaultLuk.current);
    setPhyAtk(defaultPhyAtk.current);
    setMgAtk(defaultMgAtk.current);
    setPhyDef(defaultPhyDef.current);
    setMgDef(defaultMgDef.current);
    setAcc(defaultAcc.current);
    setAvo(defaultAvo.current);
    setMove(defaultMove.current);
    setJump(defaultJump.current);
    setHp(defaultHp.current);
    setMp(defaultMp.current);
    setUpgradableCount(defaultUpgradableCount);
    setUpgradedCount(0);
    setItemBuyCount((count) => count + 1);
  }

  // 리셋버튼 핸들러 
  const handleResetClicked = () => {
    playPurchaseSound();
    resetItem();
  }

  const handlePurchaseResetClicked = () => {
    playPurchaseSound();
    setItemBuyCount(1);
    setScroll10BuyCount(0);
    setScroll60BuyCount(0);
    setScroll100BuyCount(0);
    setScroll10SuccessCount(0);
    setScroll60SuccessCount(0);
    setScroll100SuccessCount(0);
  }

  return (
    <>
      {/* <h1>아이템 시뮬레이터{`id=${itemId}`}</h1> */}


      <main className="item-simulator-section bg-light mx-3 my-3 py-3 px-1">
        <section className="item-info-section-container">
          <section className="item-info-section mx-1">
            <span className='item-info-name'>{info.name}{upgradedCount > 0 && `(+${upgradedCount})`}</span>
            <div className="item-info-basic">
              <img src={`/images/item/${itemId}.png`} />
              <div className="item-info-required">
                <RequiredStatus name="LEV" value={info.required.level} />
                <RequiredStatus name="STR" value={info.required.str} />
                <RequiredStatus name="DEX" value={info.required.dex} />
                <RequiredStatus name="INT" value={info.required.intel} />
                <RequiredStatus name="LUK" value={info.required.luk} />
                <RequiredStatus name="POP" value={info.required.pop} />
                
                <span className="item-useless-info">ITEM LEV : -</span>
                <span className="item-useless-info">ITEM EXP : -</span>

              </div>
            </div>
            <div className="item-info-job">
              <span className={info.job.common ? '' : 'red'}>초보자</span>
              <span className={info.job.warrior || info.job.common ? '' : 'red'}>전사</span>
              <span className={info.job.magician || info.job.common ? '' : 'red'}>마법사</span>
              <span className={info.job.bowman || info.job.common ? '' : 'red'} >궁수</span>
              <span className={info.job.thief || info.job.common ? '' : 'red'}>도적</span>
              <span className={info.job.common ? '' : 'red'}>해적</span>
            </div>
            <hr />

            <div className="item-info-status">
              <span>장비분류 : {CATEGORY_NAME.get(info.category)}</span>
              <span>공격속도 : {ATTACK_SPEED.get(info.attackSpeed)}</span>
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
              <span>업그레이드 가능 횟수 : {upgradableCount}</span>
            </div>
          </section>
          {
            needReset && <span className="red scroll-overflow-msg">강화 횟수를 초과하였습니다</span>
          }
          <span></span>
        </section>

        <section>
        <section className="item-controller-section mx-1">
          <select className="form-select form-select-sm" onChange={handleScrollChange}>
            {
              SCROLL_NAME_LIST.map((name) => {
                if (SCROLL_INFO.get(name).category === info.category) {
                  const key = SCROLL_INFO.get(name).keyword;
                  const scroll_name = SCROLL_INFO.get(name).name
                  return <option key={key} value={key}>{scroll_name}</option>
                }
              })
            }
          </select>

          <section className="option-select-container">
            <OptionSelect statusInfo={info.status} optionSelectHandler={handleItemOption} />
          </section>

          <div className="scroll-select">
            {/* <Scroll  /> */}
            <Scroll percent={10} name={currentScroll} onClick={handleScrollClicked} />
            <Scroll percent={60} name={currentScroll} onClick={handleScrollClicked} />
            <Scroll percent={100} name={currentScroll} onClick={handleScrollClicked} />
            <div className="scroll-info">
              <button onClick={handleResetClicked} id="reset-button">
                <img src="/images/etc/reset.png"></img>
              </button>
            </div>
          </div>

          {/********** 가격관련 정보 **********/}


          <div className="item-price-info">
            <PriceCalculator isScroll={false} buyCount={itemBuyCount} inputHandler={itemPriceChangeHandler} />
            <PriceCalculator
              isScroll={true}
              percent={10}
              buyCount={scroll10BuyCount}
              successCount={scroll10SuccessCount}
              inputHandler={scroll10PriceChangeHandler}
            />
            <PriceCalculator
              isScroll={true}
              percent={60}
              buyCount={scroll60BuyCount}
              successCount={scroll60SuccessCount}
              inputHandler={scroll60PriceChangeHandler}
            />
            <PriceCalculator
              isScroll={true}
              percent={100}
              buyCount={scroll100BuyCount}
              successCount={scroll100SuccessCount}
              inputHandler={scroll100PriceChangeHandler}
            />
            <section className="total-price-info-section">
              <div className="total-price-info">
                <img src="/images/etc/meso.png"></img>
                <span>{
                  (itemBuyCount * itemPrice +
                    scroll10BuyCount * scroll10Price +
                    scroll60BuyCount * scroll60Price +
                    scroll100BuyCount * scroll100Price).toLocaleString()
                }</span>
              </div>
              <button className="total-price-reset-btn" id="purchase-reset-button" onClick={handlePurchaseResetClicked}>
                메소 리셋
              </button>
            </section>

          </div>
        </section>
        </section>
        

      </main>
    </>
  )
}