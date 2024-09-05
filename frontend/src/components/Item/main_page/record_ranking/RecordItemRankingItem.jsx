import styles from './RecordItemRankingItem.module.css';
import SuccessScrollCount from "./SuccessScrollCount.jsx";
import {useState} from "react";

function RecordItemRankingItem({info, rank}) {

  return (
    <>
      <a className={styles.ranking_item_link} href={`/item/${info.itemId}`}>
        <main className={styles.ranking_item_container}>
          <div className={styles.ranking_expression_container}>
            {
              rank === 1 ? (
                <img className={styles.item_medal_img} src="/images/medals/gold_medal.png"/>
              ) : rank === 2 ? (
                <img className={styles.item_medal_img} src="/images/medals/silver_medal.png"/>
              ) : rank === 3 ? (
                <img className={styles.item_medal_img} src="/images/medals/bronze_medal.png"/>
              ) : (
                <span className={styles.rank_text}>{rank}위</span>
              )
            }
          </div>
          

          {/*<img className={styles.item_medal_img} src="/images/medals/gold_medal.png"/>*/}
          <span className={`${styles.ranking_item_challenger_name} ${styles.primary_red}`}>
          {info.challengerName}
        </span>
          <span className={styles.ranking_text}>&ensp;님</span>
          <img className={styles.ranking_item_img} src={`/images/item/${info.itemId}.png`}/>
          <span className={styles.item_scroll_split_colon}>:</span>
          <SuccessScrollCount percent={10} count={info?.success?.ten}/>
          <SuccessScrollCount percent={60} count={info?.success?.sixty}/>
          <SuccessScrollCount percent={100} count={info?.success?.hundred}/>
        </main>
      </a>

    </>
  );
}

export default RecordItemRankingItem;