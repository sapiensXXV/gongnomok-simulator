import styles from './RecordManageMain.module.css';
import RecordController from "./RecordSearchForm.jsx";
import RecordList from "./RecordList.jsx";
import { useEffect, useState } from "react";
import {BASE_URL} from "../../../global/uri.js";
import { useInView } from "react-intersection-observer";
import RecordObserveTrigger from "./trigger/RecordObserveTrigger.jsx";
import SelectOptionModal from "./modal/SelectOptionModal.jsx";
import axiosInstance from "../../../global/axiosInstance.js";
import axios from "axios";

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
    axiosInstance.get(
      `${BASE_URL}/api/manage/record/logs?lastId=${condition.lastId}&size=${condition.size}&name=${condition.name}`)
      .then(response => {
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
    setRecords([]);
    let copy = {...condition}
    copy.lastId = -1;
    setCondition((prev) => copy);
    fetchRecords()
  }
  
  const handleItemNameInput = (e) => {
    e.preventDefault();
    let copy = {...condition}
    copy.name = e.target.value;
    setCondition(copy);
  }
  
  const handleCellClicked = (e, record) => {
    e.preventDefault();
    setSelectedRecord(record);
    setSelectModalOpen(true);
  }
  
  const deleteRecordByName = (e) => {
    e.preventDefault();
    axiosInstance
      .delete(`${BASE_URL}/api/manage/record/logs?name=${selectedRecord.challengerName}`)
      .then((response) => {
        alert(`삭제 성공`)
        setSelectModalOpen(false);
      })
      .catch((error) => {
        alert(`삭제 실패`)
      })
  }
  
  const updateRecordAsFirst = (e) => {
    e.preventDefault();
    let requestDto = makeUpdateRequest();
    axiosInstance
      .patch(`${BASE_URL}/api/manage/record/logs`, requestDto)
      .then((response) => {
        alert(`교체 완료`)
        setSelectModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  const blockUserByIp = async (e) => {
    e.preventDefault();
    try {
      console.log(`IP Address = [${selectedRecord.ip}] 차단`)
      const response = await axiosInstance.post(`${BASE_URL}/api/block`, {
        ip: selectedRecord.ip,
        description: "기록 조작"
      })
    } catch (e) {
      console.log(e);
    }
  } 
  
  const selectModalCancel = (e) => {
    e.preventDefault();
    setSelectModalOpen(false);
  }
  
  const makeUpdateRequest = () => {
    return {
      itemId: selectedRecord.itemId ,
      name: selectedRecord.challengerName,
      status: selectedRecord.status,
      success: {
        ...selectedRecord.success,
        total: selectedRecord.success.ten + selectedRecord.success.sixty + selectedRecord.success.hundred,
      },
      scroll: selectedRecord.scroll,
      iev: selectedRecord.iev,
      score: selectedRecord.score,
      tries: selectedRecord.tries
    };
  }

  const cleanRecord = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${BASE_URL}/api/manage/record/clean`)
      .then((response) => {
        if (response.status === 200) {
          alert('정상 처리 되었습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  return (
    <>
      <main className={styles.main_container}>
        <section className={styles.main_title}> 도전기록 관리 </section>
        <RecordController
          recordSearch={handleRecordSearch}
          inputChange={handleItemNameInput}
          cleanRecord={cleanRecord}
        />
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