import styles from './RecordList.module.css';
import RecordCell from "./cell/RecordCell.jsx";

function RecordList({records, cellClicked}) {
  
  return (
    <>
      <main className={styles.main_grid}>
        {
          records.map((record, index) => {
            return ( <RecordCell record={record} key={index} cellClickedHandler={cellClicked}/> );
          })
        }
      </main>
    </>
  )
  
}

export default RecordList;