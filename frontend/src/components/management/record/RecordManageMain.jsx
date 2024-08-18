import styles from './RecordManageMain.module.css';
import RecordSearchForm from "./RecordSearchForm.jsx";
import RecordList from "./RecordList.jsx";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../../global/uri.js";
import axios from "axios";

function RecordManageMain() {
  
  const [records, setRecords] = useState([]);
  const searchCondition = useRef({ 
    lastId: -1,
    size: 20,
    name: null
  })

  useEffect(() => {
    const condition = searchCondition.current;
    axios.get(`${BASE_URL}/api/manage/record/logs?lastId=${condition.lastId}&size=${condition.size}&name=${condition.name}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  
  const handleRecordSearch = (e) => {
    e.preventDefault();
    // console.log("handleRecordSearch");
  }
  
  const handleItemNameInput = (e) => {
    e.preventDefault();
    // console.log(`handleItemNameInput: ${e.target.value}`);
  }
  
  return (
    <>
      <main className={styles.main_container}>
        <section className={styles.main_title}> 도전 기록관리 </section>
        <RecordSearchForm recordSearch={handleRecordSearch} inputChange={handleItemNameInput}/>
        <RecordList records={records}/>
      </main>
    </>
  )
}

export default RecordManageMain;