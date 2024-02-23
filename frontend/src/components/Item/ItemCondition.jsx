
export default function ItemCondition({
  handleItemName,
  handleJob,
  minLevel,
  handleMinLevel,
  handleCategory,
  handleSubmitButton
}) {

  return (
    <>
      <section className="bg-light rounded py-2">
        <h2 className="text-center item-condition-title">아이템 검색</h2>
        <form onSubmit={(e) => handleSubmitButton(e)}>
          <section id="item-name-condition" className="d-flex bd-highlight">
            <div className="p-2 flex-grow-1 bd-highlight">
              <input
                className='form-control form-control-md'
                placeholder='아이템 이름'
                onChange={handleItemName}
              />
            </div>
            <div className="p-2 bd-highlight">
              <button
                className='btn btn-primary btn-md'
                type="submit"
              >
                검색
              </button>
            </div>
          </section>

          <section className='px-2 mt-2'>
            <span>직업</span><br />
            <select
              className="form-select form-select-md"
              aria-label="직업 선택"
              onChange={handleJob}
            >
              <option value="NONE">-- 구분 없음 --</option>
              <option value="COMMON">공통</option>
              <option value="WARRIOR">전사</option>
              <option value="BOWMAN">궁수</option>
              <option value="MAGICIAN">마법사</option>
              <option value="THIEF">도적</option>
            </select>
          </section>

          <section className='px-2 mt-3'>
            <label className='form-label' htmlFor='min-level-range'>최소 레벨<b> <span className="text-success">{minLevel}</span></b></label>
            <input
              type='range'
              className='form-range'
              min='0' max='120' step='5'
              id='min-level-range'
              defaultValue={minLevel}
              onChange={handleMinLevel}
            />
          </section>


          <section className="px-2">
            <label className>장비 분류</label>
            <select
              className="form-select form-select-md"
              aria-label="장비 분류 선택"
              onChange={handleCategory}
            >
              <option value="NONE">-- 구분 없음 --</option>
              <option value="ONE_HANDED_SWORD">한손검</option>
              <option value="TWO_HANDED_SWORD">두손검</option>
              <option value="ONE_HANDED_AXE">한손 도끼</option>
              <option value="TWO_HANDED_AXE">두손 도끼</option>
              <option value="ONE_HANDED_BLUNT">한손 둔기</option>
              <option value="TWO_HANDED_BLUNT">두손 둔기</option>
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
              <option value="OVERALL">한벌옷</option>
              <option value="TOP">상의</option>
              <option value="BOTTOM">하의</option>
              <option value="SHIELD">방패</option>
              <option value="EARRING">귀고리</option>
              <option value="CAPE">망토</option>
            </select>
          </section>
        </form>
      </section>
    </>
  )
}