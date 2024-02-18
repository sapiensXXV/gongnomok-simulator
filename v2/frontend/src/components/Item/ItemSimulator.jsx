
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"

import { INIT_ITEM_INFO, CATEGORY_NAME, ATTACK_SPEED } from "/src/global/item.js";
import { SCROLL_NAME_LIST, SCROLL_INFO } from "../../global/scroll";
import Scroll from "./Scroll";
import PriceCalculator from "./PriceCalculator";

import { playFailureSound, playSuccessSound, playPurchaseSound } from "../../global/util/soundPlay";
import { playFailureEffect, playSuccessEffect } from "../../global/util/animationPlay";
import OptionSelect from "./OptionSelect";
import RequiredStatus from "./RequiredStatus";
import { useHotkeys } from "react-hotkeys-hook";


export default function ItemSimulator() {

  const { itemId } = useParams(); // item id

  useHotkeys('q', () => {
    console.log(`[Q] keyup`)
  }, { keyup: true, keydown: false });

  const availableScroll = useRef([]);

  const [info, setInfo] = useState(null); // 아이템 정보
  const [defaultStatus, setDefaultStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [upgradedCount, setUpgradedCount] = useState(null); // 업그레이드 된 횟수
  const [currentScroll, setCurrentScroll] = useState(null); // 현재 적용하고 있는 주문서
  const [purchaseInfo, setPurchaseInfo] = useState({
    item: {
      price: 0,   //아이템 가격
      buy: 0,     //구매 갯수
    },
    _10: {
      price: 0,   //10% 가격
      buy: 0,     //10%구매 갯수
      success: 0, //10% 성공 갯수
    },
    _60: {
      price: 0,
      buy: 0,
      success: 0,
    },
    _100: {
      price: 0,
      buy: 0,
      success: 0,
    },
  })

  async function fetchData() {
    try {
      const response = await axios.get(`/api/item/${itemId}`)
      const data = response.data;
      const copy = { ...data }

      setInfo({ ...data })
      setStatus((prev) => { 
        return {
        str: copy.status.str.normal,
        dex: copy.status.dex.normal,
        intel: copy.status.intel.normal,
        luk: copy.status.luk.normal,
        phyAtk: copy.status.phyAtk.normal,
        mgAtk: copy.status.mgAtk.normal,
        phyDef: copy.status.phyDef.normal,
        mgDef: copy.status.mgDef.normal,
        acc: copy.status.acc,
        avo: copy.status.avo,
        move: copy.status.move,
        jump: copy.status.jump,
        hp: copy.status.hp.normal,
        mp: copy.status.mp.normal,
        upgradable: copy.upgradableCount
      }})

      setDefaultStatus((prev) => { return {
        str: copy.status.str.normal,
        dex: copy.status.dex.normal,
        intel: copy.status.intel.normal,
        luk: copy.status.luk.normal,
        phyAtk: copy.status.phyAtk.normal,
        mgAtk: copy.status.mgAtk.normal,
        phyDef: copy.status.phyDef.normal,
        mgDef: copy.status.mgDef.normal,
        acc: copy.status.acc,
        avo: copy.status.avo,
        move: copy.status.move,
        jump: copy.status.jump,
        hp: copy.status.hp.normal,
        mp: copy.status.mp.normal,
        upgradable: copy.upgradableCount
      }})
      setUpgradedCount(0);

      availableScroll.current = SCROLL_NAME_LIST.map((name) => {
        if (SCROLL_INFO.get(name).category === data.category) {
          return SCROLL_INFO.get(name);
        }
      })

      if (availableScroll.current.length > 0) {
        setCurrentScroll(availableScroll.current[0]);
      }

      
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetchData() }, []);


  // 주문서 선택 핸들러
  const handleScrollChange = (e) => {
    setCurrentScroll(SCROLL_INFO.get(e.target.value));
  }


  // 주문서 버튼 클릭 핸들러
  function handleScrollClicked(percent) {

    if (!checkValidate()) {
      return;
    }

    // 능력치 증가 시켜야함
    let upgradeInfo = null;
    const purchaseCopy = { ...purchaseInfo }
    if (percent === 10) {
      upgradeInfo = currentScroll.upgradeValue._10;
      purchaseCopy._10.buy = purchaseCopy._10.buy + 1;
    } else if (percent === 60) {
      upgradeInfo = currentScroll.upgradeValue._60;
      purchaseCopy._60.buy = purchaseCopy._60.buy + 1;
    } else if (percent === 100) {
      upgradeInfo = currentScroll.upgradeValue._100;
      purchaseCopy._100.buy = purchaseCopy._100.buy + 1;
    }

    if (rollScroll(percent)) {
      scrollSuccess(upgradeInfo);
      if (percent === 10) purchaseCopy._10.success = purchaseCopy._10.success + 1;
      else if (percent === 60) purchaseCopy._60.success = purchaseCopy._60.success + 1;
      else if (percent === 100) purchaseCopy._100.success = purchaseCopy._100.success + 1;
    } else {
      scrollFail();
    }

    setPurchaseInfo(purchaseCopy);
    
    const statusCopy = { ...status }
    statusCopy.upgradable = statusCopy.upgradable - 1;
    setStatus(statusCopy);
  }

  function checkValidate() {
    //주문서를 더 적용할 수 있는지 검사
    if (status.upgradable <= 0) {
      return false;
    }
    return true;
  }

  function rollScroll(percent) {
    const count = percent / 10;
    let result = Math.floor(Math.random() * 10 + 1);
    if (result >= 1 && result <= count) return true;
    else return false;
  }

  function scrollSuccess(upgradeInfo) {
    //주문서 성공
    console.log('success')
    playSuccessSound();
    playSuccessEffect();
    setStatus((prevStatus) => {
      const statusCopy = { ...prevStatus };
      upgradeInfo.map((scroll) => {
        switch (scroll.name) {
          case 'str':
            statusCopy.str = statusCopy.str + scroll.value
            break;
          case 'dex':
            statusCopy.dex = statusCopy.dex + scroll.value
            break;
          case 'intel':
            statusCopy.intel = statusCopy.intel + scroll.value
            break;
          case 'luk':
            statusCopy.luk = statusCopy.luk + scroll.value
            break;
          case 'phyAtk':
            statusCopy.phyAtk = statusCopy.phyAtk + scroll.value
            break;
          case 'mgAtk':
            statusCopy.mgAtk = statusCopy.mgAtk + scroll.value
            break;
          case 'phyDef':
            statusCopy.phyDef = statusCopy.phyDef + scroll.value
            break;
          case 'mgDef':
            statusCopy.mgDef = statusCopy.mgDef + scroll.value
            break;
          case 'acc':
            statusCopy.acc = statusCopy.acc + scroll.value
            break;
          case 'avo':
            statusCopy.avo = statusCopy.avo + scroll.value
            break;
          case 'move':
            statusCopy.move = statusCopy.move + scroll.value
            break;
          case 'jump':
            statusCopy.jump = statusCopy.jump + scroll.value
            break;
          case 'hp':
            statusCopy.hp = statusCopy.hp + scroll.value
            break;
          case 'mp':
            statusCopy.mp = statusCopy.mp + scroll.value
            break;
        }
      })
      return statusCopy;
    });
    setUpgradedCount((prevUpgradedCount) => prevUpgradedCount + 1);
  }

  const scrollFail = () => {
    //주문서 실패
    playFailureSound();
    playFailureEffect();
    console.log('fail')
  }

  const itemPriceChangeHandler = (e) => {
    setPurchaseInfo((prev) => {
      const copy = { ...prev } 
      copy.item.price = e.target.value;
      return copy;
    })
  }

  const scroll10PriceChangeHandler = (e) => {
    setPurchaseInfo((prev) => {
      const copy = { ...prev } 
      copy._10.price = e.target.value;
      return copy;
    })
  }

  const scroll60PriceChangeHandler = (e) => {
    setPurchaseInfo((prev) => {
      const copy = { ...prev } 
      copy._60.price = e.target.value;
      return copy;
    })
  }

  const scroll100PriceChangeHandler = (e) => {
    setPurchaseInfo((prev) => {
      const copy = { ...prev } 
      copy._100.price = e.target.value;
      return copy;
    })
  }

  const handleItemOption = (e, statusName) => {
    const name = statusName;
    const value = e.target.value;

    setDefaultStatus((prevDefault) => {
      const copy = {...prevDefault}
      switch(name) {
        case 'str':
        copy.str = value;
        break;
      case 'dex':
        copy.dex = value;
        break;
      case 'intel':
        copy.intel = value;
        break;
      case 'luk':
        copy.luk = value;
        break;
      case 'phyAtk':
        copy.phyAtk = value;
        break;
      case 'mgAtk':
        copy.mgAtk = value;
        break;
      case 'phyDef':
        copy.phyDef = value;
        break;
      case 'mgDef':
        copy.mgDef = value;
        break;
      case 'hp':
        copy.hp = value;
        break;
      case 'mp':
        copy.mp = value;
        break;
      }

      return copy;
    })

    resetItem();
  }

  function resetItem() {
    
    // 스테이터스 초기화
    setStatus((prev) => {

      const copyDefaultStatus = { ...defaultStatus }
      const newStatus = { ...prev }
      console.log(copyDefaultStatus)
      newStatus.str = copyDefaultStatus?.status.str;
      newStatus.dex = copyDefaultStatus.status.dex;
      newStatus.intel = copyDefaultStatus.status.intel;
      newStatus.luk = copyDefaultStatus.status.luk;
      newStatus.phyAtk = copyDefaultStatus.status.phyAtk;
      newStatus.mgAtk = copyDefaultStatus.status.mgAtk;
      newStatus.phyDef = copyDefaultStatus.status.phyDef;
      newStatus.mgDef = copyDefaultStatus.status.mgDef;
      newStatus.acc = copyDefaultStatus.status.acc;
      newStatus.avo = copyDefaultStatus.status.avo;
      newStatus.move = copyDefaultStatus.status.move;
      newStatus.jump = copyDefaultStatus.status.jump;
      newStatus.hp = copyDefaultStatus.status.hp;
      newStatus.mp = copyDefaultStatus.status.mp;
      newStatus.upgradable = copyDefaultStatus.upgradableCount;

      return newStatus;
    })

    setPurchaseInfo((prev) => {
      const purchaseCopy = { ...prev }
      purchaseCopy.item.buy = purchaseCopy.item.buy + 1;
      return purchaseCopy;
    })
    setUpgradedCount(0);
  }

  // 리셋버튼 핸들러 
  const handleResetClicked = () => {
    playPurchaseSound();
    resetItem();
  }

  function handlePurchaseResetClicked() {
    playPurchaseSound();
    setPurchaseInfo((prev) => {
      const purchaseCopy = { ...prev }

      purchaseCopy.item.buy = 1;
      purchaseCopy._10.buy = 0;
      purchaseCopy._60.buy = 0;
      purchaseCopy._100.buy = 0;
      purchaseCopy._10.success = 0;
      purchaseCopy._60.success = 0;
      purchaseCopy._100.success = 0;

      return purchaseCopy;
    })
  }

  return (
    <>
    <button onClick={() => console.log(status)}>데이터 보여줘</button> 
      <main className="item-simulator-section bg-light mx-3 my-3 py-3 px-1">
        <section className="item-info-section-container">
          <section className="item-info-section mx-1">
            <span className='item-info-name'>{info?.name}{upgradedCount != null && upgradedCount > 0 && `(+${upgradedCount})`}</span>
            <div className="item-info-basic">
              <img src={`/images/item/${itemId}.png`} />
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
              <span>공격속도 : {ATTACK_SPEED.get(info?.attackSpeed)}</span>
              {status?.str > 0 && <span>STR : +{status?.str}</span>}
              {status?.dex > 0 && <span>DEX : +{status?.dex}</span>}
              {status?.intel > 0 && <span>INT : +{status?.intel}</span>}
              {status?.luk > 0 && <span>LUK : +{status?.luk}</span>}
              {status?.acc > 0 && <span>명중률 : +{status?.acc}</span>}
              {status?.avo > 0 && <span>회피율 : +{status?.avo}</span>}
              {status?.phyAtk > 0 && <span>공격력 : +{status?.phyAtk}</span>}
              {status?.mgAtk > 0 && <span>마력 : +{status?.mgAtk}</span>}
              {status?.phyDef > 0 && <span>물리방어력 : +{status?.phyDef}</span>}
              {status?.mgDef > 0 && <span>마법방어력 : +{status?.mgDef}</span>}
              {status?.hp > 0 && <span>HP : +{status?.hp}</span>}
              {status?.mp > 0 && <span>MP : +{status?.mp}</span>}
              {status?.move > 0 && <span>이동속도 : +{status?.move}</span>}
              {status?.jump > 0 && <span>점프력 : +{status?.jump}</span>}
              <span>업그레이드 가능 횟수 : {status?.upgradable}</span>
            </div>
          </section>
          {
            status?.upgradableCount <= 0 && <span className="red scroll-overflow-msg">강화 횟수를 초과하였습니다</span>
          }
          <span></span>
        </section>

        <section>
          <section className="item-controller-section mx-1">
            <select
              className="form-select form-select-sm"
              onChange={handleScrollChange}
              defaultValue={currentScroll}
            >
              {
                availableScroll.current.map((scroll) => {
                  if (scroll === undefined) return;
                  const key = scroll.keyword;
                  const scroll_name = scroll.name;
                  return <option key={key} value={key}>{scroll_name}</option>
                })
              }
            </select>

            <section className="option-select-container">
              <OptionSelect statusInfo={info?.status} optionSelectHandler={handleItemOption} />
            </section>

            <div className="scroll-select">
              {/* <Scroll  /> */}
              <Scroll percent={10} currentScroll={currentScroll} onClick={handleScrollClicked} />
              <Scroll percent={60} currentScroll={currentScroll} onClick={handleScrollClicked} />
              <Scroll percent={100} currentScroll={currentScroll} onClick={handleScrollClicked} />
              <div className="scroll-info">
                <button onClick={handleResetClicked} id="reset-button">
                  <img src="/images/etc/reset.png"></img>
                </button>
              </div>
            </div>

            {/********** 가격관련 정보 **********/}


            <div className="item-price-info">
              <PriceCalculator isScroll={false} buyCount={purchaseInfo.item.buy} inputHandler={itemPriceChangeHandler} />
              <PriceCalculator
                isScroll={true}
                percent={10}
                buyCount={purchaseInfo._10.buy}
                successCount={purchaseInfo._10.success}
                inputHandler={scroll10PriceChangeHandler}
              />
              <PriceCalculator
                isScroll={true}
                percent={60}
                buyCount={purchaseInfo._60.buy}
                successCount={purchaseInfo._60.success}
                inputHandler={scroll60PriceChangeHandler}
              />
              <PriceCalculator
                isScroll={true}
                percent={100}
                buyCount={purchaseInfo._100.buy}
                successCount={purchaseInfo._100.success}
                inputHandler={scroll100PriceChangeHandler}
              />
              <section className="total-price-info-section">
                <div className="total-price-info">
                  <img src="/images/etc/meso.png"></img>
                  <span>
                    {
                      (purchaseInfo.item.buy * purchaseInfo.item.price +
                        purchaseInfo._10.buy * purchaseInfo._10.price +
                        purchaseInfo._60.buy * purchaseInfo._60.price +
                        purchaseInfo._100.buy * purchaseInfo._100.price).toLocaleString()
                    }
                  </span>
                </div>
                <button
                  className="total-price-reset-btn"
                  id="purchase-reset-button"
                  onClick={handlePurchaseResetClicked}
                  onMouseUp={document.activeElement.blur()}
                >
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