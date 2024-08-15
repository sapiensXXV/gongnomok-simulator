import styles from "./RecordItemRanking.module.css";
import {useEffect, useState} from "react";
import RecordItemRankingItem from "./RecordItemRankingItem.jsx";
import {DEFAULT_ITEM_RECORD} from "../../../../global/item.js";

function RecordItemRanking() {

  const [items, setItems] = useState([]);
  const defaultItem = {
    item_id: 2060,
    name: "안녕하세요긴유저이름이에요",
    scroll: {
      ten: 3,
      sixty: 2,
      hundred: 0
    },
    recorded_item: DEFAULT_ITEM_RECORD
  }
  
  useEffect(() => {
    fetchScoreRanking();
  }, [])
  
  const fetchScoreRanking = () => {
    console.log('fetchScoreRanking');
    // todo - defaultItem 설정은 이후 삭제한다.
    setItems([defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem])
  };
  
  return (
    <>
      <main className={styles.item_record_ranking_container}>
        <span className={styles.item_record_main_title}>기록 랭킹</span>
        {
          items.map((item, index) => {
            return ( 
              <RecordItemRankingItem 
                key={`${item.item_id}_record_ranking`} 
                info={item}
                rank={index+1}
              /> );
          })
        }
      </main>
    </>
  );
}

export default RecordItemRanking;