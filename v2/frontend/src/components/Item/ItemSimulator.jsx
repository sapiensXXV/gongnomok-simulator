
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { INIT_ITEM_INFO, CATEGORY_NAME, ATTACK_SPEED } from "/src/global/item.js";
import { SCROLL_NAME_LIST, SCROLL_INFO } from "../../global/scroll";
import Scroll from "./Scroll";
import PriceCalculator from "./PriceCalculator";

import { playFailureSound, playSuccessSound, playPurchaseSound } from "../../global/util/soundPlay";
import { playFailureEffect, playSuccessEffect } from "../../global/util/animationPlay";
import OptionSelect from "./OptionalSelect";


export default function ItemSimulator() {

  const { itemId } = useParams();

  const [info, setInfo] = useState(INIT_ITEM_INFO); // 아이템 정보
  const [upgradedCount, setUpgradedCount] = useState(0);
  // const [defaultUpgradedCount, setDefaultUpgradedCount] = useState(0);

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
  const [defaultStr, setDefaultStr] = useState(0);
  const [defaultDex, setDefaultDex] = useState(0);
  const [defaultIntel, setDefaultIntel] = useState(0);
  const [defaultLuk, setDefaultLuk] = useState(0);
  const [defaultPhyAtk, setDefaultPhyAtk] = useState(0);
  const [defaultMgAtk, setDefaultMgAtk] = useState(0);
  const [defaultPhyDef, setDefaultPhyDef] = useState(0);
  const [defaultMgDef, setDefaultMgDef] = useState(0);
  const [defaultAcc, setDefaultAcc] = useState(0);
  const [defaultAvo, setDefaultAvo] = useState(0);
  const [defaultMove, setDefaultMove] = useState(0);
  const [defaultJump, setDefaultJump] = useState(0);
  const [defaultHp, setDefaultHp] = useState(0);
  const [defaultMp, setDefaultMp] = useState(0);
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
        console.log(status);

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
        setUpgradableCount(res.data.upgradableCount);

        setDefaultStr(status.str.normal);
        setDefaultDex(status.dex.normal);
        setDefaultIntel(status.intel.normal);
        setDefaultLuk(status.luk.normal);
        setDefaultPhyAtk(status.phyAtk.normal);
        setDefaultMgAtk(status.mgAtk.normal);
        setDefaultPhyDef(status.phyDef.normal);
        setDefaultMgDef(status.mgDef.normal);
        setDefaultAcc(status.acc);
        setDefaultAvo(status.avo);
        setDefaultMove(status.move);
        setDefaultJump(status.jump);
        setDefaultHp(status.hp.normal);
        setDefaultMp(status.mp.normal);
        setDefaultUpgradableCount(res.data.upgradableCount);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);



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

  // 리셋버튼 핸들러 
  const handleResetClicked = () => {
    playPurchaseSound();
    setStr(defaultStr);
    setDex(defaultDex);
    setIntel(defaultIntel);
    setLuk(defaultLuk);
    setPhyAtk(defaultPhyAtk);
    setMgAtk(defaultMgAtk);
    setPhyDef(defaultPhyDef);
    setMgDef(defaultMgDef);
    setAcc(defaultAcc);
    setAvo(defaultAvo);
    setMove(defaultMove);
    setJump(defaultJump);
    setHp(defaultHp);
    setMp(defaultMp);
    setUpgradableCount(defaultUpgradableCount);
    setUpgradedCount(0);
    setItemBuyCount(itemBuyCount + 1);
  }

  return (
    <>
      {/* <h1>아이템 시뮬레이터{`id=${itemId}`}</h1> */}


      <main className="item-simulator-section bg-light mx-3 my-3 py-3 px-1">

        <section className="item-info-section mx-1">
          <span className="item-info-name">{info.name}{upgradedCount > 0 && `(+${upgradedCount})`}</span>
          <div className="item-info-basic">
            <img src={`/images/item/${itemId}.png`} />
            <div className="item-info-required">
              <span>REQ LEV : {info.required.level}</span>
              <span>REQ STR : {info.required.str}</span>
              <span>REQ DEX : {info.required.dex}</span>
              <span>REQ INT : {info.required.intel}</span>
              <span>REQ LUK : {info.required.luk}</span>
              <span>REQ POP : {info.required.pop}</span>
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
            <OptionSelect statusInfo={info.status}/>
          </section>

          <div className="scroll-select">
            {/* <Scroll  /> */}
            <Scroll percent={10} name={currentScroll} onClick={handleScrollClicked} />
            <Scroll percent={60} name={currentScroll} onClick={handleScrollClicked} />
            <Scroll percent={100} name={currentScroll} onClick={handleScrollClicked} />
            <div className="scroll-info">
              <button onClick={handleResetClicked}>
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
            <div className="total-price-info">
              <img src="/images/etc/meso.png"></img>
              <span>{
                (itemBuyCount * itemPrice +
                scroll10BuyCount * scroll10Price +
                scroll60BuyCount * scroll60Price +
                scroll100BuyCount * scroll100Price).toLocaleString()
              }</span>
            </div>
          </div>

        </section>

      </main>
    </>
  )
}