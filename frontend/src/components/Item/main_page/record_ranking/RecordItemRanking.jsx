import styles from "./RecordItemRanking.module.css";
import {useEffect, useState} from "react";
import RecordItemRankingItem from "./RecordItemRankingItem.jsx";
import {DEFAULT_ITEM_RECORD} from "../../../../global/item.js";
import axios from "axios";
import {BASE_URL} from "../../../../global/uri.js";

function RecordItemRanking() {

  const [items, setItems] = useState([]);
  const defaultItem = {
    itemId: 2060,
    challengerName: "안녕하세요긴유저이름이에요",
    success: {
      ten: 3,
      sixty: 2,
      hundred: 0
    },
  }
  
  useEffect(() => {
    fetchScoreRanking();
  }, [])
  
  const fetchScoreRanking = () => {
    console.log('fetchScoreRanking');
    // todo - defaultItem 설정은 이후 삭제한다.
    // setItems([defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem, defaultItem])
    axios
      .get(`${BASE_URL}/api/item/ranking/record`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setItems(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    
  };
  
  return (
    <>
      <main className={styles.item_record_ranking_container}>
        <span className={styles.item_record_main_title}>기록 랭킹</span>
        {
          items.map((item, index) => {
            return ( 
              <RecordItemRankingItem 
                key={`${item.itemId}_record_ranking`} 
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