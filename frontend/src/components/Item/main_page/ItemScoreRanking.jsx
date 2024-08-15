import styles from "./ItemScoreRanking.module.css";
import {useEffect} from "react";

function ItemScoreRanking() {
  
  useEffect(() => {
    fetchScoreRanking();
  }, [])
  
  const fetchScoreRanking = () => {
    console.log('fetchScoreRanking');
  };
  
  return (
    <>
      <main className={styles.item_score_ranking_container}>
        
      </main>
    </>
  );
}

export default ItemScoreRanking;