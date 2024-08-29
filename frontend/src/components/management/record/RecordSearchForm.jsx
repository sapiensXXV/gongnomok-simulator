import styles from './RecordSearchForm.module.css';

// eslint-disable-next-line react/prop-types
function RecordSearchForm({
  recordSearch,
  inputChange,
  cleanRecord
}) {
  return (
    <>
      <main className={styles.record_search_container}>
        <input placeholder='아이템 이름' onChange={inputChange}/>
        <button className={styles.item_search_btn} onClick={recordSearch}>검색</button>
        <button className={styles.all_clean_btn} onClick={cleanRecord} >전체 클리너</button>
      </main>
    </>
  )
}

export default RecordSearchForm;