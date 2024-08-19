import styles from './RecordManageMain.module.css';
import RecordSearchForm from "./RecordSearchForm.jsx";
import RecordList from "./RecordList.jsx";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../../global/uri.js";
import axios from "axios";

function RecordManageMain() {
  
  const [records, setRecords] = useState([]);
  const [condition, setCondition] = useState({ 
    lastId: -1,
    size: 20,
    name: null
  })

  useEffect(() => {
    fetchRecords()
  }, []);
  
  const fetchRecords = () => {
    axios.get(`${BASE_URL}/api/manage/record/logs?lastId=${condition.lastId}&size=${condition.size}&name=${condition.name}`)
      .then(response => {
        console.log(response.data);
        refreshData(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  const refreshData = (data) => {
    // 새롭게 로딩해온 데이터를 추가
    let newRecords = [...records, ...data];
    setRecords(newRecords);

    // 페이징을 위한 recordId 조정
    let copyCondition = {...condition};
    copyCondition.lastId = data.at(-1).recordId;
    console.log(copyCondition);
    setCondition(copyCondition);
  }
  
  const handleRecordSearch = (e) => {
    e.preventDefault();
    // console.log("handleRecordSearch");
  }
  
  const handleItemNameInput = (e) => {
    e.preventDefault();
    // console.log(`handleItemNameInput: ${e.target.value}`);
  }
  
  const handleCellClicked = (e, recordId) => {
    e.preventDefault();
    console.log(`handleClick record Cell with recordId=${recordId}`);
  }
  
  return (
    <>
      <main className={styles.main_container}>
        <section className={styles.main_title}> 도전 기록관리 </section>
        <RecordSearchForm recordSearch={handleRecordSearch} inputChange={handleItemNameInput}/>
        <RecordList records={records} cellClicked={handleCellClicked}/>
      </main>
    </>
  )
}

export default RecordManageMain;