import { useState } from "react"
import JobSelect from "./JobSelect"
import { INITIAL_SEARCH_CONDITION } from "./search";
import CategorySelect from "./CategorySelect";

export default function ItemCondition({
  searchCondition,
  handleItemNameChange,
  handleJobsChange,
  handleMinLevelChange,
  handleCategoryChange,
  doSearch
}) {

  return (
    <>
      <section className="bg-light rounded py-2">
        <h2 className="text-center item-condition-title">아이템 찾기</h2>
        <form onSubmit={() => doSearch(searchCondition)}>
          <section id="item-name-condition" className="d-flex bd-highlight">
            <div className="p-2 flex-grow-1 bd-highlight">
              <input
                className='form-control form-control-md'
                placeholder='아이템 이름'
                onChange={handleItemNameChange}
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

          <section className="px-2 mt-2">
            <span className="condition-title">직업</span>
            <div className="job-select-button-container">

              <JobSelect isSelected={searchCondition?.jobs?.warrior} jobName={`전사`} jobNameEng={`warrior`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition?.jobs?.bowman} jobName={`궁수`} jobNameEng={`bowman`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition?.jobs?.magician} jobName={`마법사`} jobNameEng={`magician`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition?.jobs?.thief} jobName={`도적`} jobNameEng={`thief`} changeHandler={handleJobsChange} />

            </div>
          </section>

          <section className='px-2 mt-3'>
            <label className='form-label condition-title' htmlFor='min-level-range'>최소 레벨<b> <span className="text-success">{searchCondition?.minLevel}</span></b></label>
            <input
              type='range'
              className='form-range'
              min='0' max='120' step='1'
              id='min-level-range'
              defaultValue={INITIAL_SEARCH_CONDITION.minLevel}
              onChange={handleMinLevelChange}
            />
          </section>

          <section className="px-2 category-select-container">
            <span className="condition-title">카테고리</span>
            <div className="category-select-button-container">
              <CategorySelect category={`ONE_HANDED_SWORD`} condition={searchCondition?.category} name={`한손검`} representationItemNumber={5} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`TWO_HANDED_SWORD`} condition={searchCondition?.category} name={`두손검`} representationItemNumber={36} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`ONE_HANDED_AXE`} condition={searchCondition?.category} name={`한손 도끼`} representationItemNumber={58} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`TWO_HANDED_AXE`} condition={searchCondition?.category} name={`두손 도끼`} representationItemNumber={73} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`ONE_HANDED_BLUNT`} condition={searchCondition?.category} name={`한손 둔기`} representationItemNumber={96} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`TWO_HANDED_BLUNT`} condition={searchCondition?.category} name={`두손 둔기`} representationItemNumber={106} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`SPEAR`} condition={searchCondition?.category} name={`창`} representationItemNumber={125} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`POLEARM`} condition={searchCondition?.category} name={`폴암`} representationItemNumber={147} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`BOW`} condition={searchCondition?.category} name={`활`} representationItemNumber={193} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`CROSSBOW`} condition={searchCondition?.category} name={`석궁`} representationItemNumber={218} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`WAND`} condition={searchCondition?.category} name={`완드`} representationItemNumber={160} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`STAFF`} condition={searchCondition?.category} name={`스태프`} representationItemNumber={181} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`DAGGER`} condition={searchCondition?.category} name={`단검`} representationItemNumber={278} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`CLAW`} condition={searchCondition?.category} name={`아대`} representationItemNumber={254} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`HAT`} condition={searchCondition?.category} name={`모자`} representationItemNumber={330} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`GLOVES`} condition={searchCondition?.category} name={`장갑`} representationItemNumber={2060} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`SHOES`} condition={searchCondition?.category} name={`신발`} representationItemNumber={847} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`OVERALL`} condition={searchCondition?.category} name={`한벌옷`} representationItemNumber={461} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`TOP`} condition={searchCondition?.category} name={`상의`} representationItemNumber={976} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`BOTTOM`} condition={searchCondition?.category} name={`하의`} representationItemNumber={435} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`SHIELD`} condition={searchCondition?.category} name={`방패`} representationItemNumber={2203} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`EARRING`} condition={searchCondition.category} name={`귀고리`} representationItemNumber={2031} changeHandler={handleCategoryChange}/>
              <CategorySelect category={`CAPE`} condition={searchCondition?.category} name={`망토`} representationItemNumber={2109} changeHandler={handleCategoryChange}/>
            </div>
          </section>
        </form>
      </section>
    </>
  )
}