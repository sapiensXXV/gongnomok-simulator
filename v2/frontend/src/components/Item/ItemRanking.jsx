import axios from "axios";
import { useEffect, useState } from "react";

export default function ItemRanking() {

  const [rankingItems, setRankingItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/item/ranking`)
      .then((response) => {
        console.log(response.data);
        setRankingItems(response.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <section className="item-ranking-container d-flex bg-light">
        <span className="item-ranking-title">인기 아이템</span>

        <div className="ranking-items">
          {
            rankingItems.map((item) => {
              return (
                <div key={`item-rank${item.rank}`}>
                  <div className="single-ranking-item" >
                    <span className="item-rank-text">{`${item.rank}위 `}</span>
                    <img src={`/images/item/${item.itemId}.png`}></img>
                    <span><a href={`/item/${item.itemId}`}>{`${item.name}`}</a>{` (${item.viewCount}회)`}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
}