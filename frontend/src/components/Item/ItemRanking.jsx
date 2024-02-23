import axios from "axios";
import { useEffect, useState } from "react";

export default function ItemRanking() {

  const [rankingItems, setRankingItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/item/ranking`)
      .then((response) => {
        setRankingItems(response?.data);
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
            rankingItems != null && rankingItems?.length > 0 &&
            rankingItems?.map((item) => {
              return (
                <div key={`item-rank${item.rank}`}>
                  <a href={`/item/${item.itemId}`}>
                  <div className="single-ranking-item" >
                    
                      <span className="item-rank-text">{`${item.rank}위 `}</span>
                      <img src={`/images/item/${item.itemId}.png`}></img>
                      <span>{`${item.name}`}{` (${item.viewCount}회)`}</span>
                    
                  </div>
                  </a>
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
}