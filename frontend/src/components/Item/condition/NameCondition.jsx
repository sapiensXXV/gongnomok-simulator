import styled from './NameCondition.module.css';

function NameCondition({
                         nameChangeHandler
                       }) {
  return (
    <>
      <main id="item-name-condition" className={styled.name_condition_main}>
        <input
          className='form-control form-control-sm'
          placeholder='아이템 이름'
          onChange={nameChangeHandler}
        />
        <button className='btn btn-primary btn-sm' type="submit">검색</button>
      </main>
    </>
  )
}

export default NameCondition;