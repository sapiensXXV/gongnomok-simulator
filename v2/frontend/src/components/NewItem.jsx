import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function NewItem() {

  const navigate = useNavigate();

  // 폼에 필요한 데이터
  const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [requiredLevel, setRequiredLevel] = useState(0);

  // 요구 능력치
  const [requiredStr, setRequiredStr] = useState(0);
  const [requiredDex, setRequiredDex] = useState(0);
  const [requiredInt, setRequiredInt] = useState(0);
  const [requiredLuk, setRequiredLuk] = useState(0);
  const [requiredPop, setRequiredPop] = useState(0);

  // 요구 직업
  const [requiredJob, setRequiredJob] = useState('common');

  // 장비 카테고리
  const [category, setCategory] = useState('ONE_HANDED_SWORD');

  // 아이템 능력치
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [int, setInt] = useState(0);
  const [luk, setLuk] = useState(0);
  const [phyAtk, setPhyAtk] = useState(0);
  const [mgAtk, setMgAtk] = useState(0);
  const [phyDef, setPhyDef] = useState(0);
  const [mgDef, setMgDef] = useState(0);
  const [hp, setHp] = useState(0);
  const [mp, setMp] = useState(0);






  useEffect(() => {
    axios.get('/api/item/new')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        const status = err.response.status
        if (status === 401) {
          console.log("상태코드 401 로그인 화면으로 가세요")
          navigate('/login')
        }
        navigate('/')
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemForm = {
      id: itemId,
      name: itemName,
      required: {
        level: requiredLevel,
        str: requiredStr,
        dex: requiredDex,
        int: requiredInt,
        luk: requiredLuk,
        pop: requiredPop,
        job: requiredJob
      },
      category: category,
      status: {
        str: str,
        dex: dex,
        int: int,
        luk: luk,
        phyAtk: phyAtk,
        mgAtk: mgAtk,
        phyDef: phyDef,
        mgDef: mgDef,
        hp: hp,
        mp: mp
      }
    };
    console.log(`request json = ${itemForm}`)
    // 폼 요청
    axios
      .post('/api/item/new', itemForm)
      .then((response) => {
        console.log(response);
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
    // console.log(`required level = ${requiredLevel}`)
  }

  const handleChangeRequiredStr = (e) => {
    setRequiredStr(e.target.value);
    // console.log(`set required str = ${requiredStr}`)
  }

  const handleChangeRequiredDex = (e) => {
    setRequiredDex(e.target.value);
    // console.log(`setrequired dex = ${requiredDex}`)
  }

  const handleChangeRequiredInt = (e) => {
    setRequiredInt(e.target.value);
    // console.log(`set required int = ${requiredInt}`)
  }

  const handleChangeRequiredLuk = (e) => {
    setRequiredLuk(e.target.value);
    // console.log(`set required luk = ${requiredLuk}`)
  }

  const handleChangeRequiredPop = (e) => {
    setRequiredPop(e.target.value);
    // console.log(`set required pop = ${requiredPop}`)
  }


  // 직업 선택
  const handleSelectJob = (e) => {
    console.log(e.target.value)
    setRequiredJob(e.target.value);
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
  const handleItemDex = (e) => {
    setDex(e.target.value)
  }
  const handleItemInt = (e) => {
    setInt(e.target.value)
  }
  const handleItemLuk = (e) => {
    setLuk(e.target.value)
  }
  const handleItemPhyAtk = (e) => {
    setPhyAtk(e.target.value)
  }
  const handleItemMgAtk = (e) => {
    setMgAtk(e.target.value)
  }
  const handleItemPhyDef = (e) => {
    setPhyDef(e.target.value)
  }
  const handleItemMgDef = (e) => {
    setMgDef(e.target.value)
  }
  const handleItemHp = (e) => {
    setHp(e.target.value)
  }
  const handleItemMp = (e) => {
    setMp(e.target.value)
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

          <div className="row justify-content-start text-start">
            <div className="col-12">
              <label htmlFor="required-job" className="form-label">요구 직업</label>
              <select className="form-select form-select-sm" aria-label="job select" onChange={handleSelectJob} value={requiredJob}>
                <option value="COMMON">공통</option>
                <option value="WARRIOR">전사</option>
                <option value="BOWMAN">궁수</option>
                <option value="MAGICIAN">마법사</option>
                <option value="THIEF">도적</option>
              </select>

            </div>
          </div>

          <div className="row justify-content-start text-start">
            <div className="col-12">
              <label htmlFor="required-job" className="form-label">장비 분류</label>
              <select className="form-select form-select-sm" aria-label="job select" onChange={handleSelectCategory} value={category}>
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


          <section className="row justify-content-start text-start d-grid gap-2">
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-str" className="form-label">STR</label>
                <input type="text" id="item-str" className="form-control form-control-sm" value={str} onChange={handleItemStr} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-dex" className="form-label">Dex</label>
                <input type="text" id="item-dex" className="form-control form-control-sm" value={dex} onChange={handleItemDex} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-int" className="form-label">INT</label>
                <input type="text" id="item-int" className="form-control form-control-sm" value={int} onChange={handleItemInt} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-luk" className="form-label">LUK</label>
                <input type="text" id="item-luk" className="form-control form-control-sm" value={luk} onChange={handleItemLuk} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-phyAtk" className="form-label">공격력</label>
                <input type="text" id="item-phyAtk" className="form-control form-control-sm" value={phyAtk} onChange={handleItemPhyAtk} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-mgAtk" className="form-label">마력</label>
                <input type="text" id="item-mgAtk" className="form-control form-control-sm" value={mgAtk} onChange={handleItemMgAtk} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-phyDef" className="form-label">물리방어력</label>
                <input type="text" id="item-phyDef" className="form-control form-control-sm" value={phyDef} onChange={handleItemPhyDef} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-str" className="form-label">마법방어력</label>
                <input type="text" id="item-str" className="form-control form-control-sm" value={str} onChange={handleItemMgDef} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-hp" className="form-label">HP</label>
                <input type="text" id="item-hp" className="form-control form-control-sm" value={hp} onChange={handleItemHp} />
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="item-mp" className="form-label">MP</label>
                <input type="text" id="item-mp" className="form-control form-control-sm" value={mp} onChange={handleItemMp} />
              </div>

            </div>
          </section>
          <button className="btn btn-success btn-sm mb-3" type="submit">등록</button>
        </div>

      </form>
    </>
  );

}