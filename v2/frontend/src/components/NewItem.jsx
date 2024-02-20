import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import JobSelect from "./Item/form/JobSelect";


export default function NewItem() {

  const navigate = useNavigate();

  // 폼에 필요한 데이터
  const [itemId, setItemId] = useState(1);
  const [itemName, setItemName] = useState('');
  const [requiredLevel, setRequiredLevel] = useState(0);

  // 요구 능력치
  const [requiredStr, setRequiredStr] = useState(0);
  const [requiredDex, setRequiredDex] = useState(0);
  const [requiredInt, setRequiredInt] = useState(0);
  const [requiredLuk, setRequiredLuk] = useState(0);
  const [requiredPop, setRequiredPop] = useState(0);

  // 요구 직업
  const [requiredJob, setRequiredJob] = useState({
    common: false,
    warrior: false,
    bowman: false,
    magician: false,
    thief: false
  });

  // 장비 카테고리
  const [category, setCategory] = useState('ONE_HANDED_SWORD');

  // 아이템 능력치
  const [str, setStr] = useState(0);
  const [strLower, setStrLower] = useState(0);
  const [strUpper, setStrUpper] = useState(0);

  const [dex, setDex] = useState(0);
  const [dexLower, setDexLower] = useState(0);
  const [dexUpper, setDexUpper] = useState(0);

  const [int, setInt] = useState(0);
  const [intLower, setIntLower] = useState(0);
  const [intUpper, setIntUpper] = useState(0);

  const [luk, setLuk] = useState(0);
  const [lukLower, setLukLower] = useState(0);
  const [lukUpper, setLukUpper] = useState(0);

  const [phyAtk, setPhyAtk] = useState(0);
  const [phyAtkLower, setPhyAtkLower] = useState(0);
  const [phyAtkUpper, setPhyAtkUpper] = useState(0);

  const [mgAtk, setMgAtk] = useState(0);
  const [mgAtkLower, setMgAtkLower] = useState(0);
  const [mgAtkUpper, setMgAtkUpper] = useState(0);

  const [phyDef, setPhyDef] = useState(0);
  const [phyDefLower, setPhyDefLower] = useState(0);
  const [phyDefUpper, setPhyDefUpper] = useState(0);

  const [mgDef, setMgDef] = useState(0);
  const [mgDefLower, setMgDefLower] = useState(0);
  const [mgDefUpper, setMgDefUpper] = useState(0);

  const [acc, setAcc] = useState(0);
  const [accLower, setAccLower] = useState(0);
  const [accUpper, setAccUpper] = useState(0);

  const [avo, setAvo] = useState(0);
  const [avoLower, setAvoLower] = useState(0);
  const [avoUpper, setAvoUpper] = useState(0);

  const [move, setMove] = useState(0);
  const [moveLower, setMoveLower] = useState(0);
  const [moveUpper, setMoveUpper] = useState(0);

  const [jump, setJump] = useState(0);
  const [jumpLower, setJumpLower] = useState(0);
  const [jumpUpper, setJumpUpper] = useState(0);

  const [hp, setHp] = useState(0);
  const [hpLower, setHpLower] = useState(0);
  const [hpUpper, setHpUpper] = useState(0);

  const [mp, setMp] = useState(0);
  const [mpLower, setMpLower] = useState(0);
  const [mpUpper, setMpUpper] = useState(0);

  //공격속도
  const [attackSpeed, setAttackSpeed] = useState('NORMAL')


  //업그레이드 가능 횟수
  const [upgradableCount, setUpgradableCount] = useState(7);

  //넉백 확률
  const [knockBackPercent, setKnockBackPercent] = useState(0);


  useEffect(() => {
    axios.get('/api/item/new')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
        navigate('/login')
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemForm = {
      id: itemId,
      name: itemName,
      requiredJob: requiredJob,
      required: {
        level: requiredLevel,
        str: requiredStr,
        dex: requiredDex,
        intel: requiredInt, // 서버에서 int가 예약어인 관계로 intel 사용
        luk: requiredLuk,
        pop: requiredPop,
      },
      category: category,
      status: {
        str: {
          normal: str,
          lower: strLower,
          upper: strUpper
        },
        dex: {
          normal: dex,
          lower: dexLower,
          upper: dexUpper
        },
        intel: {
          normal: int,
          lower: intLower,
          upper: intUpper
        },
        luk: {
          normal: luk,
          lower: lukLower,
          upper: lukUpper
        },
        phyAtk: {
          normal: phyAtk,
          lower: phyAtkLower,
          upper: phyAtkUpper
        },
        mgAtk: {
          normal: mgAtk,
          lower: mgAtkLower,
          upper: mgAtkUpper
        },
        phyDef: {
          normal: phyDef,
          lower: phyDefLower,
          upper: phyDefUpper
        },
        mgDef: {
          normal: mgDef,
          lower: mgDefLower,
          upper: mgDefUpper
        },
        acc: {
          normal: acc,
          lower: accLower,
          upper: accUpper
        },
        avo: {
          normal: avo,
          lower: avoLower,
          upper: avoUpper
        },
        move: {
          normal: move,
          lower: moveLower,
          upper: moveUpper
        },
        jump: {
          normal: jump,
          lower: jumpLower,
          upper: jumpUpper
        },
        hp: {
          normal: hp,
          lower: hpLower,
          upper: hpUpper
        },
        mp: {
          normal: mp,
          lower: mpLower,
          upper: mpUpper
        }
      },
      upgradableCount: upgradableCount,
      attackSpeed: ((attackSpeed === 'NONE') ? null : attackSpeed),
      knockBackPercent: knockBackPercent
    };
    console.log(`request json = ${itemForm}`)
    // 폼 요청
    axios
      .post('/api/item/new', itemForm)
      .then((response) => {
        console.log(response);
        alert('등록성공')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // id 입력
  const handleChangeId = (e) => {
    setItemId(e.target.value);
  }
  // 이름 입력
  const handleChangeName = (e) => {
    setItemName(e.target.value);
  }

  // 요구사항
  const handleChangeRequiredLevel = (e) => {
    setRequiredLevel(e.target.value);
  }

  const handleChangeRequiredStr = (e) => {
    setRequiredStr(e.target.value);
  }

  const handleChangeRequiredDex = (e) => {
    setRequiredDex(e.target.value);
  }

  const handleChangeRequiredInt = (e) => {
    setRequiredInt(e.target.value);
  }

  const handleChangeRequiredLuk = (e) => {
    setRequiredLuk(e.target.value);
  }

  const handleChangeRequiredPop = (e) => {
    setRequiredPop(e.target.value);
  }


  const handleSelectJob = (e) => {
    const value = e.target.value
    const checked = e.target.checked
    const newJob = { ...requiredJob }
    
    if (value === "common") {
      if (checked) newJob.common = true;
      else newJob.common = false;
    } else if (value === "warrior") {
      if (checked) newJob.warrior = true;
      else newJob.warrior = false;
    } else if (value === "bowman") {
      if (checked) newJob.bowman = true;
      else newJob.bowman = false;
    } else if (value === "magician") {
      if (checked) newJob.magician = true;
      else newJob.magician = false;
    } else if (value === "thief") {
      if (checked) newJob.thief = true; 
      else newJob.thief = false;
    }

    setRequiredJob(newJob);
  }

  // 무기 분류 선택
  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
    console.log(`set category = ${category}`)
  }

  // 능력치 변환
  const handleItemStr = (e) => {
    setStr(e.target.value)
  }

  const handleItemStrLower = (e) => {
    setStrLower(e.target.value)
  }

  const handleItemStrUpper = (e) => {
    setStrUpper(e.target.value)
  } 

  const handleItemDex = (e) => {
    setDex(e.target.value)
  }
  const handleItemDexLower = (e) => {
    setDexLower(e.target.value)
  }
  const handleItemDexUpper = (e) => {
    setDexUpper(e.target.value)
  }

  const handleItemInt = (e) => {
    setInt(e.target.value)
  }

  const handleItemIntLower = (e) => {
    setIntLower(e.target.value)
  }

  const handleItemIntUpper = (e) => {
    setIntUpper(e.target.value)
  }

  const handleItemLuk = (e) => {
    setLuk(e.target.value)
  }

  const handleItemLukLower = (e) => {
    setLukLower(e.target.value)
  }

  const handleItemLukUpper = (e) => {
    setLukUpper(e.target.value)
  }

  const handleItemPhyAtk = (e) => {
    setPhyAtk(e.target.value)
  }

  const handleItemPhyAtkLower = (e) => {
    setPhyAtkLower(e.target.value)
  }

  const handleItemPhyAtkUpper = (e) => {
    setPhyAtkUpper(e.target.value)
  }

  const handleItemMgAtk = (e) => {
    setMgAtk(e.target.value)
  }

  const handleItemMgAtkLower = (e) => {
    setMgAtkLower(e.target.value)
  }

  const handleItemMgAtkUpper = (e) => {
    setMgAtkUpper(e.target.value)
  }

  const handleItemPhyDef = (e) => {
    setPhyDef(e.target.value)
  }

  const handleItemPhyDefLower = (e) => {
    setPhyDefLower(e.target.value)
  }

  const handleItemPhyDefUpper = (e) => {
    setPhyDefUpper(e.target.value)
  }

  const handleItemMgDef = (e) => {
    setMgDef(e.target.value)
  }

  const handleItemMgDefLower = (e) => {
    setMgDefLower(e.target.value)
  }

  const handleItemMgDefUpper = (e) => {
    setMgDefUpper(e.target.value)
  }

  const handleItemHp = (e) => {
    setHp(e.target.value)
  }

  const handleItemHpLower = (e) => {
    setHpLower(e.target.value)
  }

  const handleItemHpUpper = (e) => {
    setHpUpper(e.target.value)
  }

  const handleItemMp = (e) => {
    setMp(e.target.value)
  }

  const handleAcc = (e) => {
    setAcc(e.target.value)
  }

  const handleAccLower = (e) => {
    setAccLower(e.target.value)
  }

  const handleAccUpper = (e) => {
    setAccUpper(e.target.value)
  }

  const handleAvo = (e) => {
    setAvo(e.target.value)
  }

  const handleAvoLower = (e) => {
    setAvoLower(e.target.value)
  }

  const handleAvoUpper = (e) => {
    setAvoUpper(e.target.value)
  }

  const handleMove = (e) => {
    setMove(e.target.value)
  }

  const handleMoveLower = (e) => {
    setMoveLower(e.target.value)
  }

  const handleMoveUpper = (e) => {
    setMoveUpper(e.target.value)
  }

  const handleJump = (e) => {
    setJump(e.target.value)
  }

  const handleJumpLower = (e) => {
    setJumpLower(e.target.value)
  }

  const handleJumpUpper = (e) => {
    setJumpUpper(e.target.value)
  }

  const handleItemMpLower = (e) => {
    setMpLower(e.target.value)
  }

  const handleItemMpUpper = (e) => {
    setMpUpper(e.target.value)
  }

  //업그레이드 가능 횟수
  const handleUpgradableCountSelect = (e) => {
    setUpgradableCount(e.target.value);
  }

  const handleAttackSpeed = (e) => {
    setAttackSpeed(e.target.value);
  }

  const handleKnockBackPercent = (e) => {
    setKnockBackPercent(e.target.value);
  }

  return (
    <>
      <h1 className="text-center mt-3">아이템 등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className="container d-grid gap-2">

          <div className="row">
            <div className="col-6">
              <label htmlFor="item-id" className="form-label">아이템 ID</label>
              <input type="text" id="item-id" className="form-control form-control-sm" value={itemId} onChange={handleChangeId} />
            </div>
            <div className="col-6">
              <label htmlFor="item-name" className="form-label">아이템 이름</label>
              <input type="text" id="item-name" className="form-control form-control-sm" value={itemName} onChange={handleChangeName} />
            </div>
          </div>
          <div className="justify-content-start">
            <div className="col-4">
              <label htmlFor="required-level" className="form-label">요구레벨</label>
              <input type="text" id="required-level" className="form-control form-control-sm" value={requiredLevel} onChange={handleChangeRequiredLevel} />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <label htmlFor="required-str" className="form-label">요구 STR</label>
              <input type="text" id="required-str" className="form-control form-control-sm" value={requiredStr} onChange={handleChangeRequiredStr} />
            </div>
            <div className="col-2">
              <label htmlFor="required-dex" className="form-label">요구 DEX</label>
              <input type="text" id="required-dex" className="form-control form-control-sm" value={requiredDex} onChange={handleChangeRequiredDex} />
            </div>
            <div className="col-2">
              <label htmlFor="required-int" className="form-label">요구 INT</label>
              <input type="text" id="required-int" className="form-control form-control-sm" value={requiredInt} onChange={handleChangeRequiredInt} />
            </div>
            <div className="col-2">
              <label htmlFor="required-luk" className="form-label">요구 LUK</label>
              <input type="text" id="required-luk" className="form-control form-control-sm" value={requiredLuk} onChange={handleChangeRequiredLuk} />
            </div>
            <div className="col-2">
              <label htmlFor="required-pop" className="form-label">요구 POP</label>
              <input type="text" id="required-pop" className="form-control form-control-sm" value={requiredPop} onChange={handleChangeRequiredPop} />
            </div>
          </div>

          <label htmlFor="required-job" className="form-label mt-2">요구 직업</label>
          <section id="required-job">
            <JobSelect name="공통" jobId="common_job_id" value="common" selectHandler={handleSelectJob}/>
            <JobSelect name="전사" jobId="warrior_job_id" value="warrior" selectHandler={handleSelectJob}/>
            <JobSelect name="궁수" jobId="bowman_job_id" value="bowman" selectHandler={handleSelectJob}/>
            <JobSelect name="마법사" jobId="magician_job_id" value="magician" selectHandler={handleSelectJob}/>
            <JobSelect name="도적" jobId="theif_job_id" value="thief" selectHandler={handleSelectJob}/>
          </section>


          <div className="row justify-content-start text-start">
            <div className="col-12">
              <label htmlFor="required-job-select" className="form-label">장비 분류</label>
              <select id="required-job-select" className="form-select form-select-sm" aria-label="job select" onChange={handleSelectCategory} value={category}>
                <option value="ONE_HANDED_SWORD">한손검</option>
                <option value="TWO_HANDED_SWORD">두손검</option>
                <option value="ONE_HANDED_AXE">한손도끼</option>
                <option value="TWO_HANDED_AXE">두손도끼</option>
                <option value="ONE_HANDED_BLUNT">한손둔기</option>
                <option value="TWO_HANDED_BLUNT">두손둔기</option>
                <option value="SPEAR">창</option>
                <option value="POLEARM">폴암</option>
                <option value="BOW">활</option>
                <option value="CROSSBOW">석궁</option>
                <option value="WAND">완드</option>
                <option value="STAFF">스태프</option>
                <option value="DAGGER">단검</option>
                <option value="CLAW">아대</option>
                <option value="HAT">모자</option>
                <option value="GLOVES">장갑</option>
                <option value="SHOES">신발</option>
                <option value="OVERALL">전신</option>
                <option value="TOP">상의</option>
                <option value="BOTTOM">하의</option>
                <option value="SHIELD">방패</option>
                <option value="EARRING">귀고리</option>
                <option value="CAPE">망토</option>

              </select>

            </div>
          </div>


          <section className="row">
            <div className="col-12">
              <label htmlFor="upgradable-count-select" className="form-label">공격 속도</label>
              <select id="upgradable-count-select" className="form-select form-select-sm" aria-label="job select" onChange={handleAttackSpeed} value={attackSpeed}>
                <option value="NONE">-- 없음 --</option>
                <option value="VERY_SLOW">매우 느림</option>
                <option value="SLOW">느림</option>
                <option value="NORMAL">보통</option>
                <option value="FAST">빠름</option>
                <option value="VERY_FAST">매우 빠름</option>
              </select>
            </div>
          </section>

          <section className="row justify-content-start text-start">
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-str" className="form-label">STR</label>
                <input type="text" id="item-str" className="form-control form-control-sm" value={str} onChange={handleItemStr} />
              </div>
              <div className="col-2">
                <label htmlFor="item-str-lower" className="form-label">하옵</label>
                <input type="text" id="item-str-lower" className="form-control form-control-sm" value={strLower} onChange={handleItemStrLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-str-upper" className="form-label">상옵</label>
                <input type="text" id="item-str-upper" className="form-control form-control-sm" value={strUpper} onChange={handleItemStrUpper} />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-dex" className="form-label">Dex</label>
                <input type="text" id="item-dex" className="form-control form-control-sm" value={dex} onChange={handleItemDex} />
              </div>
              <div className="col-2">
                <label htmlFor="item-dex-lower" className="form-label">하옵</label>
                <input type="text" id="item-dex-lower" className="form-control form-control-sm" value={dexLower} onChange={handleItemDexLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-dex-upper" className="form-label">상옵</label>
                <input type="text" id="item-dex-upper" className="form-control form-control-sm" value={dexUpper} onChange={handleItemDexUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-intel" className="form-label">intel</label>
                <input type="text" id="item-intel" className="form-control form-control-sm" value={int} onChange={handleItemInt} />
              </div>
              <div className="col-2">
                <label htmlFor="item-intel-lower" className="form-label">하옵</label>
                <input type="text" id="item-intel-lower" className="form-control form-control-sm" value={intLower} onChange={handleItemIntLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-intel-upper" className="form-label">상옵</label>
                <input type="text" id="item-intel-upper" className="form-control form-control-sm" value={intUpper} onChange={handleItemIntUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-luk" className="form-label">LUK</label>
                <input type="text" id="item-luk" className="form-control form-control-sm" value={luk} onChange={handleItemLuk} />
              </div>
              <div className="col-2">
                <label htmlFor="item-luk-lower" className="form-label">하옵</label>
                <input type="text" id="item-luk-lower" className="form-control form-control-sm" value={lukLower} onChange={handleItemLukLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-luk-upper" className="form-label">상옵</label>
                <input type="text" id="item-luk-upper" className="form-control form-control-sm" value={lukUpper} onChange={handleItemLukUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-phyAtk" className="form-label">공격력</label>
                <input type="text" id="item-phyAtk" className="form-control form-control-sm" value={phyAtk} onChange={handleItemPhyAtk} />
              </div>
              <div className="col-2">
                <label htmlFor="item-phyAtk-lower" className="form-label">하옵</label>
                <input type="text" id="item-phyAtk-lower" className="form-control form-control-sm" value={phyAtkLower} onChange={handleItemPhyAtkLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-phyAtk-upper" className="form-label">상옵</label>
                <input type="text" id="item-phyAtk-upper" className="form-control form-control-sm" value={phyAtkUpper} onChange={handleItemPhyAtkUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-mgAtk" className="form-label">마력</label>
                <input type="text" id="item-mgAtk" className="form-control form-control-sm" value={mgAtk} onChange={handleItemMgAtk} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mgAtk-lower" className="form-label">하옵</label>
                <input type="text" id="item-mgAtk-lower" className="form-control form-control-sm" value={mgAtkLower} onChange={handleItemMgAtkLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mgAtk-upper" className="form-label">상옵</label>
                <input type="text" id="item-mgAtk-upper" className="form-control form-control-sm" value={mgAtkUpper} onChange={handleItemMgAtkUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-phyDef" className="form-label">물리방어력</label>
                <input type="text" id="item-phyDef" className="form-control form-control-sm" value={phyDef} onChange={handleItemPhyDef} />
              </div>
              <div className="col-2">
                <label htmlFor="item-phyDef-lower" className="form-label">하옵</label>
                <input type="text" id="item-phyDef-lower" className="form-control form-control-sm" value={phyDefLower} onChange={handleItemPhyDefLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-phyDef-upper" className="form-label">상옵</label>
                <input type="text" id="item-phyDef-upper" className="form-control form-control-sm" value={phyDefUpper} onChange={handleItemPhyDefUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-mgDef" className="form-label">마법방어력</label>
                <input type="text" id="item-mgDef" className="form-control form-control-sm" value={mgDef} onChange={handleItemMgDef} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mgDef-lower" className="form-label">하옵</label>
                <input type="text" id="item-mgDef-lower" className="form-control form-control-sm" value={mgDefLower} onChange={handleItemMgDefLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mgDef-upper" className="form-label">상옵</label>
                <input type="text" id="item-mgDef-upper" className="form-control form-control-sm" value={mgDefUpper} onChange={handleItemMgDefUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-acc" className="form-label">명중률</label>
                <input type="text" id="item-acc" className="form-control form-control-sm" value={acc} onChange={handleAcc} />
              </div>
              <div className="col-2">
                <label htmlFor="item-acc-lower" className="form-label">하옵</label>
                <input type="text" id="item-acc-lower" className="form-control form-control-sm" value={accLower} onChange={handleAccLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-acc-upper" className="form-label">상옵</label>
                <input type="text" id="item-acc-upper" className="form-control form-control-sm" value={accUpper} onChange={handleAccUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-acc" className="form-label">회피율</label>
                <input type="text" id="item-acc" className="form-control form-control-sm" value={avo} onChange={handleAvo} />
              </div>
              <div className="col-2">
                <label htmlFor="item-acc-lower" className="form-label">하옵</label>
                <input type="text" id="item-acc-lower" className="form-control form-control-sm" value={avoLower} onChange={handleAvoLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-acc-upper" className="form-label">상옵</label>
                <input type="text" id="item-acc-upper" className="form-control form-control-sm" value={avoUpper} onChange={handleAvoUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-move" className="form-label">이동속도</label>
                <input type="text" id="item-move" className="form-control form-control-sm" value={move} onChange={handleMove} />
              </div>
              <div className="col-2">
                <label htmlFor="item-move-lower" className="form-label">하옵</label>
                <input type="text" id="item-move-lower" className="form-control form-control-sm" value={moveLower} onChange={handleMoveLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-move-upper" className="form-label">상옵</label>
                <input type="text" id="item-move-upper" className="form-control form-control-sm" value={moveUpper} onChange={handleMoveUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-jump" className="form-label">점프력</label>
                <input type="text" id="item-jump" className="form-control form-control-sm" value={jump} onChange={handleJump} />
              </div>
              <div className="col-2">
                <label htmlFor="item-jump-lower" className="form-label">하옵</label>
                <input type="text" id="item-jump-lower" className="form-control form-control-sm" value={jumpLower} onChange={handleJumpLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-jump-upper" className="form-label">상옵</label>
                <input type="text" id="item-jump-upper" className="form-control form-control-sm" value={jumpUpper} onChange={handleJumpUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-hp" className="form-label">HP</label>
                <input type="text" id="item-hp" className="form-control form-control-sm" value={hp} onChange={handleItemHp} />
              </div>
              <div className="col-2">
                <label htmlFor="item-hp-lower" className="form-label">하옵</label>
                <input type="text" id="item-hp-lower" className="form-control form-control-sm" value={hpLower} onChange={handleItemHpLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-hp-upper" className="form-label">상옵</label>
                <input type="text" id="item-hp-upper" className="form-control form-control-sm" value={hpUpper} onChange={handleItemHpUpper} />
              </div>

            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="item-mp" className="form-label">MP</label>
                <input type="text" id="item-mp" className="form-control form-control-sm" value={mp} onChange={handleItemMp} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mp-lower" className="form-label">하옵</label>
                <input type="text" id="item-mp-lower" className="form-control form-control-sm" value={mpLower} onChange={handleItemMpLower} />
              </div>
              <div className="col-2">
                <label htmlFor="item-mp-upper" className="form-label">상옵</label>
                <input type="text" id="item-mp-upper" className="form-control form-control-sm" value={mpUpper} onChange={handleItemMpUpper} />
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <label htmlFor="item-knockBack" className="form-label">타격 넉백 확률</label>
                <input type="text" id="item-knockBack" className="form-control form-control-sm" value={knockBackPercent} onChange={handleKnockBackPercent} />
              </div>
            </div>
          </section>

          <section className="row">
            <div className="col-12">
              <label htmlFor="upgradable-count-select" className="form-label">업그레이드 가능 횟수</label>
              <select id="upgradable-count-select" className="form-select form-select-sm" aria-label="job select" onChange={handleUpgradableCountSelect} value={upgradableCount}>
                <option value={0}>0</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
              </select>
            </div>
          </section>

          <button className="btn btn-success btn-sm mb-3 mt-3" type="submit">등록</button>
        </div>
      </form>
    </>
  );

}