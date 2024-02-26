import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URI } from "../../global/uri";
import { DEFAULT_RANKING_FETCH_SIZE, MAXIMUM_RANKING_PAGE } from "../../global/item";

export default function ItemRanking() {

  const [rankingItems, setRankingItems] = useState([]);
  const [rankingPage, setRankingPage] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${BASE_URI}/api/item/ranking?page=0&size=${DEFAULT_RANKING_FETCH_SIZE}`,
        { withCredentials: true }
      )
      .then((response) => {
        setRankingItems(response?.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handlePreviousButtonClicked() {
    console.log(`previous`)
    if (rankingPage <= 0) return; //현재 페이지가 0 이하일 경우 수행하지 않고 반환

    // 이전 페이지 요청 수행
    axios
      .get(
        `${BASE_URI}/api/item/ranking?page=${rankingPage-1}&size=${DEFAULT_RANKING_FETCH_SIZE}`,
        { withCredentials: true }
      )
      .then((response) => {
        setRankingItems(response?.data);
      })
      .catch((err) => {
        console.log(err)
      })

    
    setRankingPage((prev) => prev - 1); //현재 페이지 감소
  }

  function handleNextButtonClicked() {
    console.log(`next`)
    if (rankingPage >= MAXIMUM_RANKING_PAGE-1) return; //현재 페이지가 최대 페이지 이상일 경우 수행하지 않고 반환

    axios
      .get(
        `${BASE_URI}/api/item/ranking?page=${rankingPage+1}&size=${DEFAULT_RANKING_FETCH_SIZE}`,
        { withCredentials: true }
      )
      .then((response) => {
        setRankingItems(response?.data);
      })
      .catch((err) => {
        console.log(err)
      })

    setRankingPage((prev) => prev + 1); // 현재 페이지 증가

  }

  return (
    <>
      <section className="item-ranking-container d-flex bg-light">
        <span className="item-ranking-title">인기 아이템</span>
        <div className="item-ranking-controller">
          <button 
            className="item-ranking-button"
            onClick={handlePreviousButtonClicked}
          >
            <img src="/images/etc/previous.png"/>
          </button>
          <div className="ranking-items">
          {
            rankingItems != null && rankingItems?.length > 0 &&
            rankingItems?.map((item) => {
              return (
                <div key={`item-rank${item.rank}`}>
                  <a href={`/item/${item.itemId}`}>
                    <div className="single-ranking-item" >

                      <span className="item-rank-text">{`${item.rank + rankingPage * DEFAULT_RANKING_FETCH_SIZE}위 `}</span>
                      <img src={`/images/item/${item.itemId}.png`}></img>
                      <span>{`${item.name}`}{` (${item.viewCount}회)`}</span>

                    </div>
                  </a>
                </div>
              )
            })
            }
          </div>
          <button 
            className="item-ranking-button"
            onClick={handleNextButtonClicked}
          >
            <img src="/images/etc/next.png"/>
          </button>
        </div>
        <span className="mt-2">{`${rankingPage+1}/${MAXIMUM_RANKING_PAGE}`}</span>
        
      </section>
    </>
  );
}