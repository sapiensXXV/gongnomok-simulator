import { useState } from "react"
import JobSelect from "./JobSelect"
import { INITIAL_SEARCH_CONDITION } from "./search";
import CategorySelect from "./CategorySelect";

export default function ItemCondition({
  doSearch
}) {

  const [searchCondition, setSearchCondition] = useState(INITIAL_SEARCH_CONDITION);

  function handleItemNameChange(e) {
    console.log(`handleItemNameChange`)
  }

  function handleJobsChange(e, jobName) {
    e.preventDefault();
    console.log(`handleJobsChange`)
    // jobName에 따라서 올바른 속성을 true로 변경한 후 condition 값을 세팅한다.
    let copy = {...searchCondition}
    switch (jobName) {
      case 'warrior':
        copy.jobs.warrior = !copy.jobs.warrior; break;
      case 'bowman':
        copy.jobs.bowman = !copy.jobs.bowman; break;
      case 'magician':
        copy.jobs.magician = !copy.jobs.magician; break;
      case 'thief':
        copy.jobs.thief = !copy.jobs.thief; break;
    }

    setSearchCondition(copy)
    doSearch(copy);
  }

  function handleMinLevelChange(e) {
    console.log(`handleMinLevelChange`)
    let copy = {...searchCondition};
    copy.minLevel = e.target.value;
    setSearchCondition(copy);
  }

  function handleCategoryChange(e, category) {
    e.preventDefault();
    console.log(`handleCategoryChange`)
    let copy = {...searchCondition};
    if (copy.category !== 'ALL') {
      copy.category = 'ALL'
    } else {
      copy.category = category;
    }

    setSearchCondition(copy);
    doSearch(copy);
  }

  return (
    <>
      <section className="bg-light rounded py-2">
        <h2 className="text-center item-condition-title">아이템 검색</h2>
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

              <JobSelect isSelected={searchCondition.jobs.warrior} jobName={`전사`} jobNameEng={`warrior`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition.jobs.bowman} jobName={`궁수`} jobNameEng={`bowman`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition.jobs.magician} jobName={`마법사`} jobNameEng={`magician`} changeHandler={handleJobsChange} />
              <JobSelect isSelected={searchCondition.jobs.thief} jobName={`도적`} jobNameEng={`thief`} changeHandler={handleJobsChange} />

            </div>
          </section>

          <section className='px-2 mt-3'>
            <label className='form-label condition-title' htmlFor='min-level-range'>최소 레벨<b> <span className="text-success">{searchCondition.minLevel}</span></b></label>
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
              <CategorySelect isSelected={searchCondition.category === "ONE_HANDED_SWORD"} name={`한손검`} representationItemNumber={5} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "TWO_HANDED_SWORD"} name={`두손검`} representationItemNumber={31} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "ONE_HANDED_AXE"} name={`한손 도끼`} representationItemNumber={58} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "TWO_HANDED_AXE"} name={`두손 도끼`} representationItemNumber={72} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "ONE_HANDED_BLUNT"} name={`한손 둔기`} representationItemNumber={96} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "TWO_HANDED_BLUNT"} name={`두손 둔기`} representationItemNumber={106} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "SPEAR"} name={`창`} representationItemNumber={125} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "POLEARM"} name={`폴암`} representationItemNumber={147} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "BOW"} name={`활`} representationItemNumber={193} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "CROSSBOW"} name={`석궁`} representationItemNumber={218} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "WAND"} name={`완드`} representationItemNumber={160} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "STAFF"} name={`스태프`} representationItemNumber={181} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "DAGGER"} name={`단검`} representationItemNumber={278} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "CLAW"} name={`아대`} representationItemNumber={254} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "HAT"} name={`모자`} representationItemNumber={330} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "GLOVES"} name={`장갑`} representationItemNumber={2060} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "SHOES"} name={`신발`} representationItemNumber={847} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "OVERALL"} name={`한벌옷`} representationItemNumber={461} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "TOP"} name={`상의`} representationItemNumber={976} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "BOTTOM"} name={`하의`} representationItemNumber={435} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "SHIELD"} name={`방패`} representationItemNumber={2203} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "EARRING"} name={`귀고리`} representationItemNumber={2031} changeHandler={handleCategoryChange}/>
              <CategorySelect isSelected={searchCondition.category === "CAPE"} name={`망토`} representationItemNumber={2109} changeHandler={handleCategoryChange}/>
            </div>
            
          </section>
        </form>
      </section>
    </>
  )
}