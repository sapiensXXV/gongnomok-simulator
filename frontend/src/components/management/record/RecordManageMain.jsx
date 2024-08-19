import styles from './RecordManageMain.module.css';
import RecordController from "./RecordSearchForm.jsx";
import RecordList from "./RecordList.jsx";
import {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../../../global/uri.js";
import axios from "axios";
import {observe, useInView} from "react-intersection-observer";
import RecordObserveTrigger from "./trigger/RecordObserveTrigger.jsx";
import SelectOptionModal from "./modal/SelectOptionModal.jsx";

function RecordManageMain() {
  
  const [records, setRecords] = useState([]);
  const [condition, setCondition] = useState({ 
    lastId: -1,
    size: 20,
    name: null
  })
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [observeTrigger, inView] = useInView();

  useEffect(() => {
    fetchRecords()
  }, [inView]);
  
  const fetchRecords = () => {
    axios.get(`${BASE_URL}/api/manage/record/logs?lastId=${condition.lastId}&size=${condition.size}&name=${condition.name}`, { withCredentials: true })
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
  
  const handleCellClicked = (e, record) => {
    e.preventDefault();
    console.log(`레코드 ID가 ${record.recordId}인 레코드를 선택`);
    setSelectedRecord(record);
    setSelectModalOpen(true);
  }
  
  const deleteRecordByName = (e) => {
    e.preventDefault();
    console.log(`레코드 ID가 ${selectedRecord.recordId}인 기록을 삭제한다.`);
  }
  
  const updateRecordAsFirst = (e) => {
    e.preventDefault();
    console.log(`레코드ID가 ${selectedRecord.recordId}인 로그의 기록을 최고 기록으로 만든다.`)
  }
  
  const blockUserByIp = (e) => {
    e.preventDefault();
    console.log(`레코드 ID가 ${selectedRecord.recordId}인 로그를 기록한 유저의 IP주소를 차단한다`);
  } 
  
  const selectModalCancel = (e) => {
    e.preventDefault();
    setSelectModalOpen(false);
  }
  
  return (
    <>
      <main className={styles.main_container}>
        <section className={styles.main_title}> 도전기록 관리 </section>
        <RecordController recordSearch={handleRecordSearch} inputChange={handleItemNameInput}/>
        <RecordList records={records} cellClicked={handleCellClicked}/>
        <RecordObserveTrigger target={observeTrigger}/>
      </main>
      <SelectOptionModal 
        isOpen={selectModalOpen}
        deleteRecordByName={deleteRecordByName}
        updateRecordAsFirst={updateRecordAsFirst}
        blockUserByIp={blockUserByIp}
        cancelHandler={selectModalCancel}
      />
      
    </>
  )
}

export default RecordManageMain;