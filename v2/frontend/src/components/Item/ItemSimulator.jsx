
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { INIT_ITEM_INFO, CATEGORY_NAME, ATTACK_SPEED } from "/src/global/item.js";
import { SCROLL_NAME_LIST, SCROLL_INFO } from "../../global/scroll";
import Scroll from "./Scroll";


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

  // 아이템정보를 가져온다.
  useEffect(() => {
    axios
      .get(`/api/item/${itemId}`)
      .then((res) => {
        console.log(res)
        setInfo(res.data);
        const status = res.data.status;

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

    // 능력치 증가 시켜야함
    const info = SCROLL_INFO.get(currentScroll);
    let upgradeInfo = null;
    if (percent === 10) {
      upgradeInfo = info.upgradeValue._10;
    } else if (percent === 60) {
      upgradeInfo = info.upgradeValue._60;
    } else if (percent === 100) {
      upgradeInfo = info.upgradeValue._100;
    }

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
          break;
        case 'avo':
          break;
        case 'move':
          break;
        case 'jump':
          break;
        case 'hp':
          setHp(hp + info.value)
          break;
        case 'mp':
          setMp(mp + info.value)
          break;
      }
    })
  }

  // 리셋버튼 핸들러 
  const handleResetClicked = () => {
    setStr(defaultStr);
    setDex(defaultDex);
    setIntel(defaultIntel);
    setLuk(defaultLuk);
    setPhyAtk(defaultPhyAtk);
    setMgAtk(defaultMgAtk);
    setPhyDef(defaultPhyDef);
    setMgDef(defaultMgDef);
    setHp(defaultHp);
    setMp(defaultMp);
    setUpgradableCount(defaultUpgradableCount);
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
        </section>

      </main>
    </>
  )
}