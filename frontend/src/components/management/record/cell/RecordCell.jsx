import styles from './RecordCell.module.css';
import ScrollSuccess from "./ScrollSuccess.jsx";
import StatusUpgrade from "./StatusUpgrade.jsx";
import isoDateToFormatString from "../../../../global/date.js";

function RecordCell({ 
  record,
  cellClickedHandler
}) {
  
  console.log(record.ip);
  
  return (
    <>
      <main className={styles.main_flex} onClick={(e) => cellClickedHandler(e, record)}>
        <span className={styles.challenger_name}>{record.challengerName}</span>
        <img src={`/images/item/${record.itemId}.png`} />
        <span>&nbsp;:&nbsp;</span>
        <ScrollSuccess success={record.success}/>
        <div className={styles.try_block}>
          <span>시도 횟수:&nbsp;</span>
          <span className={styles.primary_red}>{record.tries}</span>
        </div>
        <StatusUpgrade status={record.status} />
        <div className={styles.iev_block}>
          <span>iev: &nbsp;{record.iev}</span>
        </div>
        <div className={styles.score_block}>
          <span>점수: &nbsp;{record.score}</span>
        </div>
        <span>{isoDateToFormatString(record.ip)}</span>
      </main>
    </>
  )
}

export default RecordCell;