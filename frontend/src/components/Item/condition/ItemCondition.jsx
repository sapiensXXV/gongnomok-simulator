import { useState } from "react"
import JobCondition from "./JobCondition.jsx"
import { INITIAL_SEARCH_CONDITION } from "./search";
import CategoryCondition from "./CategoryCondition.jsx";
import NameCondition from "./NameCondition.jsx";

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
      <section className="bg-light rounded py-3 item-condition-root">
        <h2 className="text-center item-condition-title">아이템 찾기</h2>
        <form onSubmit={(e) => doSearch(e, searchCondition)}>
          
          <NameCondition nameChangeHandler={handleItemNameChange} />

          <section className="px-2 mt-2">
            <span className="condition-title">직업</span>
            <div className="job-select-button-container">
              <JobCondition isSelected={searchCondition?.jobs?.warrior} jobName={`전사`} jobNameEng={`warrior`} changeHandler={handleJobsChange} />
              <JobCondition isSelected={searchCondition?.jobs?.bowman} jobName={`궁수`} jobNameEng={`bowman`} changeHandler={handleJobsChange} />
              <JobCondition isSelected={searchCondition?.jobs?.magician} jobName={`마법사`} jobNameEng={`magician`} changeHandler={handleJobsChange} />
              <JobCondition isSelected={searchCondition?.jobs?.thief} jobName={`도적`} jobNameEng={`thief`} changeHandler={handleJobsChange} />
            </div>
          </section>

          <section className="px-2 category-select-container">
            <span className="condition-title">카테고리</span>
            <div className="category-select-button-container">
              <CategoryCondition category={`ONE_HANDED_SWORD`} condition={searchCondition?.category} name={`한손검`} representationItemNumber={5} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`TWO_HANDED_SWORD`} condition={searchCondition?.category} name={`두손검`} representationItemNumber={36} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`ONE_HANDED_AXE`} condition={searchCondition?.category} name={`한손 도끼`} representationItemNumber={58} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`TWO_HANDED_AXE`} condition={searchCondition?.category} name={`두손 도끼`} representationItemNumber={73} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`ONE_HANDED_BLUNT`} condition={searchCondition?.category} name={`한손 둔기`} representationItemNumber={96} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`TWO_HANDED_BLUNT`} condition={searchCondition?.category} name={`두손 둔기`} representationItemNumber={106} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`SPEAR`} condition={searchCondition?.category} name={`창`} representationItemNumber={125} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`POLEARM`} condition={searchCondition?.category} name={`폴암`} representationItemNumber={147} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`BOW`} condition={searchCondition?.category} name={`활`} representationItemNumber={193} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`CROSSBOW`} condition={searchCondition?.category} name={`석궁`} representationItemNumber={218} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`WAND`} condition={searchCondition?.category} name={`완드`} representationItemNumber={160} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`STAFF`} condition={searchCondition?.category} name={`스태프`} representationItemNumber={181} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`DAGGER`} condition={searchCondition?.category} name={`단검`} representationItemNumber={278} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`CLAW`} condition={searchCondition?.category} name={`아대`} representationItemNumber={254} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`HAT`} condition={searchCondition?.category} name={`모자`} representationItemNumber={330} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`GLOVES`} condition={searchCondition?.category} name={`장갑`} representationItemNumber={2060} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`SHOES`} condition={searchCondition?.category} name={`신발`} representationItemNumber={847} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`OVERALL`} condition={searchCondition?.category} name={`한벌옷`} representationItemNumber={461} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`TOP`} condition={searchCondition?.category} name={`상의`} representationItemNumber={976} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`BOTTOM`} condition={searchCondition?.category} name={`하의`} representationItemNumber={435} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`SHIELD`} condition={searchCondition?.category} name={`방패`} representationItemNumber={2203} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`EARRING`} condition={searchCondition.category} name={`귀고리`} representationItemNumber={2031} changeHandler={handleCategoryChange}/>
              <CategoryCondition category={`CAPE`} condition={searchCondition?.category} name={`망토`} representationItemNumber={2109} changeHandler={handleCategoryChange}/>
            </div>
          </section>
        </form>
      </section>
    </>
  )
}