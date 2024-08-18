import styles from './RecordSearchForm.module.css';

// eslint-disable-next-line react/prop-types
function RecordSearchForm({
  recordSearch,
  inputChange
}) {
  return (
    <>
      <main className={styles.record_search_container}>
        <input placeholder='아이템 이름' onChange={inputChange}/>
        <button type='submit' onClick={recordSearch}>검색</button>
      </main>
    </>
  )
}

export default RecordSearchForm;