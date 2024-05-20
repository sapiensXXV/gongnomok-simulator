
import axios from "axios";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { playFailureSound, playSuccessSound, playPurchaseSound, playDiceSound } from "../../global/util/soundPlay";
import { useHotkeys } from "react-hotkeys-hook";

import { BASE_URI } from "../../global/uri";
import { ATTACK_SPEED, CATEGORY_NAME, DEAFULT_SUCCESS_SCROLL } from "../../global/item";
import { SCROLL_NAME_LIST, SCROLL_INFO } from "../../global/scroll";

import ShortcutInfo from "./ShortcutInfo";
import OptionSelect from "./OptionSelect";
import RequiredStatus from "./RequiredStatus";
import Scroll from "./Scroll";
import PriceCalculator from "./PriceCalculator";
import Comment from "./comment/Comment";
import BestRecordItem from "./BestRecordItem";

let timer = null;

export default function ItemSimulator() {
  const { itemId } = useParams(); // item id
  const availableScroll = useRef([]);

  const [info, setInfo] = useState(null); // 아이템 정보
  const [infoCopy, setInfoCopy] = useState(null);
  const [upgradedCount, setUpgradedCount] = useState(0); // 업그레이드 된 횟수
  const [currentScroll, setCurrentScroll] = useState('WAND_MG_ATK'); // 현재 적용하고 있는 주문서
  const [successScroll, setSuccessScroll] = useState(DEAFULT_SUCCESS_SCROLL); // 현재 성공한 주문서 정보

  // 표시 능력치
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
  const [upgradable, setUpgradable] = useState(0);
  const [knockBackPercent, setKnockBackPercent] = useState(0);

  const defaultStr = useRef(0);
  const defaultDex = useRef(0);
  const defaultIntel = useRef(0);
  const defaultLuk = useRef(0);
  const defaultPhyAtk = useRef(0);
  const defaultMgAtk = useRef(0);
  const defaultPhyDef = useRef(0);
  const defaultMgDef = useRef(0);
  const defaultAcc = useRef(0);
  const defaultAvo = useRef(0);
  const defaultMove = useRef(0);
  const defaultJump = useRef(0);
  const defaultHp = useRef(0);
  const defaultMp = useRef(0);
  const defaultUpgradable = useRef(0);

  // 구매가격
  const [itemPrice, setItemPrice] = useState(0);
  const [itemBuyCount, setItemBuyCount] = useState(1);
  const [scroll10Price, setScroll10Price] = useState(0);
  const [scroll10BuyCount, setScroll10BuyCount] = useState(0);
  const [scroll10Success, setScroll10Success] = useState(0);
  const [scroll60Price, setScroll60Price] = useState(0);
  const [scroll60BuyCount, setScroll60BuyCount] = useState(0);
  const [scroll60Success, setScroll60Success] = useState(0);
  const [scroll100Price, setScroll100Price] = useState(0);
  const [scroll100BuyCount, setScroll100BuyCount] = useState(0);
  const [scroll100Success, setScroll100Success] = useState(0);

  //버튼 Ref
  const scroll10Button = useRef();
  const scroll60Button = useRef();
  const scroll100Button = useRef();
  const resetButton = useRef();
  const purchaseResetButton = useRef();

  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [challengerName, setChallengerName] = useState("");
  const [isChallengerNameEmpty, setIsChallengerNameEmpty] = useState(false);

  async function fetchData() {
    try {
      const response = await axios.get(`${BASE_URI}/api/item/${itemId}`, { withCredentials: true })
      const data = response.data;
      const copy = JSON.parse(JSON.stringify(data));
      setInfoCopy({...response.data});
      setInfo(data);

      setStr(copy.status.str.normal);
      setDex(copy.status.dex.normal);
      setIntel(copy.status.intel.normal);
      setLuk(copy.status.luk.normal);
      setPhyAtk(copy.status.phyAtk.normal);
      setMgAtk(copy.status.mgAtk.normal);
      setPhyDef(copy.status.phyDef.normal);
      setMgDef(copy.status.mgDef.normal);
      setAcc(copy.status.acc.normal);


      setAvo(copy.status.avo.normal);
      setMove(copy.status.move.normal);
      setJump(copy.status.jump.normal);
      setHp(copy.status.hp.normal);
      setMp(copy.status.mp.normal);
      setUpgradable(copy.upgradableCount)
      setKnockBackPercent(copy.knockBackPercent);

      defaultStr.current = copy.status.str.normal;
      defaultDex.current = copy.status.dex.normal;
      defaultIntel.current = copy.status.intel.normal;
      defaultLuk.current = copy.status.luk.normal;
      defaultPhyAtk.current = copy.status.phyAtk.normal;
      defaultMgAtk.current = copy.status.mgAtk.normal;
      defaultPhyDef.current = copy.status.phyDef.normal;
      defaultMgDef.current = copy.status.mgDef.normal;
      defaultAcc.current = copy.status.acc.normal;
      defaultAvo.current = copy.status.avo.normal;
      defaultMove.current = copy.status.move.normal;
      defaultJump.current = copy.status.jump.normal;
      defaultHp.current = copy.status.hp.normal;
      defaultMp.current = copy.status.mp.normal;
      defaultUpgradable.current = copy.upgradableCount



      for (let i = 0; i < SCROLL_NAME_LIST?.length; i++) {
        const name = SCROLL_NAME_LIST[i];
        if (SCROLL_INFO.get(name).category === data.category) {
          availableScroll.current = [...availableScroll.current, SCROLL_INFO.get(name)];
        }
      }

      if (availableScroll.current?.length > 0) {
        setCurrentScroll(availableScroll.current[0]);
      }

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetchData() }, []);

  // 주문서 선택 핸들러
  function handleScrollChange(e) {
    setCurrentScroll(() => SCROLL_INFO.get(e.target.value));
  }


  // 주문서 버튼 클릭 핸들러
  function handleScrollClicked(percent) {

    if (!checkValidate()) {
      return;
    }

    // 능력치 증가 시켜야함
    if (rollScroll(percent)) {
      scrollSuccess(percent);
    } else {
      scrollFail();
    }

    if (percent === 10) {
      setScroll10BuyCount((prev) => prev + 1);
    } else if (percent === 60) {
      setScroll60BuyCount((prev) => prev + 1);
    } else if (percent === 100) {
      setScroll100BuyCount((prev) => prev + 1);
    }

    setUpgradable((prev) => prev - 1);
  }

  function checkValidate() {
    //주문서를 더 적용할 수 있는지 검사
    if (upgradable <= 0) {
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

  function refreshSuccessScroll() {
    setSuccessScroll(DEAFULT_SUCCESS_SCROLL);
  }

  function addSuccessScrollInfo(percent) {

    const copy = {...successScroll}
    copy.total += 1;
    if (percent === 10) {
      copy.ten += 1;
    } else if (percent === 60) {
      copy.sixty += 1;
    } else if (percent === 100) {
      copy.hundred += 1;
    } 

    setSuccessScroll(copy);
  }

  function scrollSuccess(percent) {

    //주문서 성공
    playSuccessSound();
    playSuccessGif();

    addSuccessScrollInfo(percent); // 성공한 주문서 정보 추가
    if (percent === 10) {
      setScroll10Success((prev) => prev + 1);
    } else if (percent === 60) {
      setScroll60Success((prev) => prev + 1);
    } else if (percent === 100) {
      setScroll100Success((prev) => prev + 1);
    }

    let upgradeInfo = null;
    if (percent === 10) {
      upgradeInfo = SCROLL_INFO.get(currentScroll.keyword).upgradeValue._10
    } else if (percent === 60) {
      upgradeInfo = SCROLL_INFO.get(currentScroll.keyword).upgradeValue._60
    } else if (percent === 100) {
      upgradeInfo = SCROLL_INFO.get(currentScroll.keyword).upgradeValue._100
    }

    upgradeInfo?.map((scroll) => {
      switch (scroll.name) {
        case 'str':
          setStr((prev) => prev + scroll.value)
          break;
        case 'dex':
          setDex((prev) => prev + scroll.value)
          break;
        case 'intel':
          setIntel((prev) => prev + scroll.value)
          break;
        case 'luk':
          setLuk((prev) => prev + scroll.value)
          break;
        case 'phyAtk':
          setPhyAtk((prev) => prev + scroll.value)
          break;
        case 'mgAtk':
          setMgAtk((prev) => prev + scroll.value)
          break;
        case 'phyDef':
          setPhyDef((prev) => prev + scroll.value)
          break;
        case 'mgDef':
          setMgDef((prev) => prev + scroll.value)
          break;
        case 'acc':
          setAcc((prev) => prev + scroll.value)
          break;
        case 'avo':
          setAvo((prev) => prev + scroll.value)
          break;
        case 'move':
          setMove((prev) => prev + scroll.value)
          break;
        case 'jump':
          setJump((prev) => prev + scroll.value)
          break;
        case 'hp':
          setHp((prev) => prev + scroll.value)
          break;
        case 'mp':
          setMp((prev) => prev + scroll.value)
          break;
      }
    })
    setUpgradedCount((prev) => prev + 1);
  }

  function scrollFail() {
    //주문서 실패
    playFailureSound();
    playFailureGif();
  }

  const itemPriceChangeHandler = (e) => {
    e.preventDefault();
    setItemPrice(e.target.value)
  }

  const scroll10PriceChangeHandler = useCallback((e) => {
    setScroll10Price(e.target.value);
  }, [])

  const scroll60PriceChangeHandler = useCallback((e) => {
    setScroll60Price(e.target.value);
  }, [])

  const scroll100PriceChangeHandler = useCallback((e) => {
    setScroll100Price(e.target.value);
  }, [])

  function handleItemOption(e, statusName) {
    const name = statusName;
    const value = Number(e.target.value);

    switch (name) {
      case 'str':

        defaultStr.current = value;
        break;
      case 'dex':
        defaultDex.current = value;
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
      case 'avo':
        defaultAvo.current = value;
        break;
      case 'acc':
        defaultAcc.current = value;
        break;
      case 'move':
        defaultMove.current = value;
        break;
      case 'jump':
        defaultJump.current = value;
        break;
    }

    resetItem();
    setItemBuyCount((prev) => prev - 1);

  }

  function resetItem() {
    resetStatus();
    refreshSuccessScroll();
    setItemBuyCount((prev) => prev + 1);
    setUpgradedCount(0);
  }

  function resetStatus() {
    setStr(defaultStr.current)
    setDex(defaultDex.current)
    setIntel(defaultIntel.current)
    setLuk(defaultLuk.current)
    setPhyAtk(defaultPhyAtk.current)
    setMgAtk(defaultMgAtk.current)
    setPhyDef(defaultPhyDef.current)
    setMgDef(defaultMgDef.current)
    setAcc(defaultAcc.current)
    setAvo(defaultAvo.current)
    setMove(defaultMove.current)
    setJump(defaultJump.current)
    setHp(defaultHp.current)
    setMp(defaultMp.current)
    setUpgradable(defaultUpgradable.current)
  }

  // 리셋버튼 핸들러 
  function handleResetClicked() {
    playDiceSound();
    resetItem();
  }

  function handlePurchaseResetClicked() {
    playPurchaseSound();
    resetItem();
    setItemBuyCount(1);
    setScroll10BuyCount(0);
    setScroll60BuyCount(0);
    setScroll100BuyCount(0);
    setScroll10Success(0);
    setScroll60Success(0);
    setScroll100Success(0);
  }

  function getItemNameColor() {
    
    const result = calculateIEV();

    if (result >= 0 && result <= 5) {
      if (upgradedCount === 0) {
        return 'white'
      } else {
        return 'orange'
      }
    } else if (result >= 6 && result <= 22) {
      return 'blue';
    } else if (result >= 23 && result <= 39) {
      return 'purple'
    } else if (result >= 40 && result <= 56) {
      return 'yellow'
    } else if (result >= 57 && result <= 73) {
      return 'green'
    }

    return 'white';

  }

  // 핫키
  useHotkeys('q', () => {
    scroll10Button.current.focus();
    handleScrollClicked(10)
  }, { keyup: false, keydown: true });
  useHotkeys('w', () => {
    scroll60Button.current.focus();
    handleScrollClicked(60)
  }, { keyup: false, keydown: true });
  useHotkeys('e', () => {
    scroll100Button.current.focus();
    handleScrollClicked(100)
  }, { keyup: false, keydown: true });
  useHotkeys('r', () => {
    resetButton.current.focus();
    handleResetClicked()
  }, { keyup: false, keydown: true });
  useHotkeys('f', () => {
    purchaseResetButton.current.focus();
    handlePurchaseResetClicked()
  }, { keyup: false, keydown: true });

  useHotkeys('q', () => {
    scroll10Button.current.blur();
  }, { keyup: true, keydown: false });
  useHotkeys('w', () => {
    scroll60Button.current.blur();
  }, { keyup: true, keydown: false });
  useHotkeys('e', () => {
    scroll100Button.current.blur();
  }, { keyup: true, keydown: false });
  useHotkeys('r', () => {
    resetButton.current.blur();
  }, { keyup: true, keydown: false });
  useHotkeys('f', () => {
    purchaseResetButton.current.blur();
  }, { keyup: true, keydown: false });

  const scrollAnimation = useRef();
  const transParentImgPath = '/images/etc/empty.png';
  const successGifPath = '/images/etc/gif/success-150.gif';
  const failGifPath = '/images/etc/gif/failure-150.gif'

  function playSuccessGif() {
    clearTimeout(timer);
    scrollAnimation.current.src = successGifPath;
    timer = setTimeout(function () {
      scrollAnimation.current.src = transParentImgPath;
    }, 900);
  }

  function playFailureGif() {
    clearTimeout(timer);
    scrollAnimation.current.src = failGifPath;
    timer = setTimeout(function () {
      scrollAnimation.current.src = transParentImgPath;
    }, 600);
  }

  function calculateIEV() {
    let totalDefault = [
      defaultStr.current, defaultDex.current, defaultIntel.current, defaultLuk.current, defaultPhyAtk.current,
      defaultMgAtk.current, defaultPhyDef.current, defaultMgDef.current, defaultAcc.current, defaultAvo.current,
      defaultMove.current, defaultJump.current, defaultHp.current, defaultMp.current
    ].reduce((prev, cur, idx) => { return prev += cur });

    let totalStatus = [
      str, dex, intel, luk, phyAtk, mgAtk, phyDef, mgDef, acc, avo, move, jump, hp, mp
    ].reduce((prev, cur, idx) => { return prev += cur });

    totalDefault = totalDefault - (defaultHp.current + defaultMp.current) + defaultHp.current / 10 + defaultMp.current / 10;
    totalStatus = totalStatus - (hp + mp) + hp / 10 + mp / 10;

    return totalStatus - totalDefault;
  }

  const [challengeResultModalOpen, setChallengeResultModalOpen] = useState(false);
  const [isChallengeSuccess, setIsChallengeSuccess] = useState(false);

  function challengeRecordButtonClicked() {
    setChallengeModalOpen(true);
  }

  function createChallengeForm() {
    return {
      name: challengerName,
      upgradable: infoCopy.upgradableCount,
      iev: calculateIEV(),
      scroll: currentScroll.keyword,
      success: successScroll,
      status: {
        str: str - defaultStr.current,
        dex: dex - defaultDex.current,
        intel: intel - defaultIntel.current,
        luk: luk - defaultLuk.current,
        phyAtk: phyAtk - defaultPhyAtk.current,
        mgAtk: mgAtk - defaultMgAtk.current,
        phyDef: phyDef - defaultPhyDef.current,
        mgDef: mgDef - defaultMgDef.current,
        acc: acc - defaultAcc.current,
        avo: avo - defaultAvo.current,
        move: move - defaultMove.current,
        jump: jump - defaultJump.current,
        hp: hp - defaultHp.current,
        mp: mp - defaultMp.current
      },
    }
  }

  function handleChallengeAcceptButtonClicked() {

    if (challengerName === '') {
      setIsChallengerNameEmpty(true);
      return;
    }

    const challengeForm = createChallengeForm();
    axios
      .post(
        `${BASE_URI}/api/item/${itemId}/enhanced`,
        challengeForm, { withCredentials: true }
      )
      .then((res) => {
        const challengeResult = res.data.status;
        setChallengeResultModalOpen(true);
        if (challengeResult === 'SUCCESS') {
          setIsChallengeSuccess(true);
        } else {
          setIsChallengeSuccess(false);
        }
        
      })
      .catch((err) => {
        console.log(err);
      })

    setChallengeModalOpen(false);
  }

  function handleChallengeCancelButtonClicked() {
    setChallengeModalOpen(false);
  }

  function handleChallengeNameChanged(e) {
    setChallengerName(e.target.value);
  }

  function handleChallengeResultOkButton() {
    setChallengeResultModalOpen(false);
  }

  return (
    <>
      <section className="shorcut-guide-section bg-success">
        <span className="shortcut-title">단축키</span>
        <div className="shortcut-info">
          <ShortcutInfo description='Q-10%적용' />
          <ShortcutInfo description='W-60%적용' />
          <ShortcutInfo description='E-100%적용' />
          <ShortcutInfo description='R-아이템 리셋' />
          <ShortcutInfo description='F-구매기록 리셋' />
        </div>
        
      </section>
      <section className="item-simulator-root">
        <main className="item-simulator-section bg-light  my-3 mx-3 py-3 px-3">
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
                  {(info?.attackSpeed !== null && info?.attackSpeed !== 'NONE' ) && <span>공격속도 : {ATTACK_SPEED.get(info?.attackSpeed)}</span>}
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
            <section className="item-record-challenge-section">
              <button 
                className="item-record-challenge-btn"
                onClick={challengeRecordButtonClicked}
                onMouseUp={() => document.activeElement.blur()}
              >기록 도전</button>
            </section>
          </section>


          {/********************* 가격관련 정보 ***********************/}

          <div>
            <section className="d-flex justify-content-center">
              <section className="item-controller-section mx-1">
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => handleScrollChange(e)}
                  defaultValue={currentScroll}
                >
                  {
                    availableScroll?.current != null && availableScroll.current?.length > 0 &&
                    availableScroll.current?.map((scroll) => {
                      if (scroll === undefined) return;
                      const key = scroll.keyword;
                      return <option key={`${key}`} value={key}>{scroll.name}</option>
                    })
                  }
                </select>

                <section className="option-select-container">
                  <OptionSelect statusInfo={info?.status} optionSelectHandler={handleItemOption} />
                </section>

                <div className="scroll-select">
                  {/* <Scroll  /> */}
                  <Scroll ref={scroll10Button} percent={10} currentScroll={currentScroll} onClick={handleScrollClicked} />
                  <Scroll ref={scroll60Button} percent={60} currentScroll={currentScroll} onClick={handleScrollClicked} />
                  <Scroll ref={scroll100Button} percent={100} currentScroll={currentScroll} onClick={handleScrollClicked} />
                  <div className="scroll-info">
                    <button ref={resetButton} onClick={handleResetClicked} id="reset-button" onMouseUp={() => document.activeElement.blur()}>
                      <img src="/images/etc/reset.png"></img>
                    </button>
                  </div>
                </div>
                <div className="item-price-info">
                  <PriceCalculator
                    key={`item-price`}
                    isScroll={false}
                    price={itemPrice}
                    buyCount={itemBuyCount}
                    inputHandler={itemPriceChangeHandler}
                  />
                  <PriceCalculator
                    key={`scroll-price-10`}
                    isScroll={true}
                    percent={10}
                    price={scroll10Price}
                    buyCount={scroll10BuyCount}
                    successCount={scroll10Success}
                    inputHandler={scroll10PriceChangeHandler}
                  />
                  <PriceCalculator
                    key={`scroll-price-60`}
                    isScroll={true}
                    percent={60}
                    price={scroll60Price}
                    buyCount={scroll60BuyCount}
                    successCount={scroll60Success}
                    inputHandler={scroll60PriceChangeHandler}
                  />
                  <PriceCalculator
                    key={`scroll-price-100`}
                    isScroll={true}
                    percent={100}
                    price={scroll100Price}
                    buyCount={scroll100BuyCount}
                    successCount={scroll100Success}
                    inputHandler={scroll100PriceChangeHandler}
                  />

                  <section className="total-price-info-section">
                    <div className="total-price-info">
                      <img src="/images/etc/meso.png"></img>
                      <span>
                        {
                          (itemBuyCount * itemPrice +
                            scroll10BuyCount * scroll10Price +
                            scroll60BuyCount * scroll60Price +
                            scroll100BuyCount * scroll100Price).toLocaleString()
                        }
                      </span>
                    </div>

                    <button
                      ref={purchaseResetButton}
                      className="total-price-reset-btn"
                      id="purchase-reset-button"
                      onClick={handlePurchaseResetClicked}
                      onMouseUp={() => document.activeElement.blur()}
                    >
                      구매기록 리셋
                    </button>
                  </section>

                </div>
              </section>
            </section>
          </div>

        </main>
        <BestRecordItem itemId={itemId} info={infoCopy}/>
      </section>
      
      {
        challengeModalOpen &&
        <div
          className="custom-modal-container"
        >
          <div className="custom-modal-root">
            <div className="custom-modal-header">
              <div className="custom-modal-title text-center">기록으로 등록하시겠습니까?</div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="custom-modal-dialog">
                  <article className="custom-modal-menu-title">이름<span className="red"> (※ 부적절한 이름 입력 시 삭제처리 됩니다.)</span></article>
                  <input
                    className="custom-modal-input-element"
                    type="text"
                    placeholder="이름을 입력하세요."
                    defaultValue=""
                    value={challengerName}
                    onChange={handleChallengeNameChanged}
                  ></input>
                  {
                    isChallengerNameEmpty &&
                    <span className="red">이름을 입력해주세요</span>
                  }
                </div>
              </div>
              <div className="custom-modal-button-container">
                <button
                  className="custom-modal-button custom-modal-ok-button"
                  onClick={handleChallengeAcceptButtonClicked}
                >
                  예
                </button>
                <button
                  className="custom-modal-button custom-modal-cancel-button"
                  onClick={handleChallengeCancelButtonClicked}
                >
                  아니오
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {
        challengeResultModalOpen &&
        <div
          className="custom-modal-container"
        >
          <div className="custom-modal-root">
            <div className="custom-modal-header">
              <div className="custom-modal-title text-center">
                도전 결과
              </div>
            </div>
            <div className="custom-modal-body">
              <div className="custom-modal-content">
                <div className="text-center">
                  { isChallengeSuccess ? `등록에 성공하였습니다!` : `등록에 실패했습니다. 더 좋은 아이템을 만들어보세요!` }
                </div>
              </div>
              <div className="custom-modal-button-container">
                <button
                  className="custom-modal-button custom-modal-ok-button"
                  onClick={handleChallengeResultOkButton}
                >
                  예
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/***********************************************************************/}
      {/******************************** 댓글 **********************************/}
      {/***********************************************************************/}
      <Comment itemId={itemId} />
    </>
  )
}