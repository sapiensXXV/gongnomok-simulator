import axios from "axios";
import { useEffect, useState } from "react";
import {BASE_URL, ASSETS_URL} from "../../../global/uri.js";
import { DEFAULT_RANKING_FETCH_SIZE, MAXIMUM_RANKING_PAGE } from "../../../global/item.js";
import axiosInstance from "../../../global/axiosInstance.js";

export default function ItemRanking() {

  const [rankingItems, setRankingItems] = useState([]);
  const [rankingPage, setRankingPage] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`${BASE_URL}/api/item/ranking/view_count?page=0&size=${DEFAULT_RANKING_FETCH_SIZE}`)
      .then((response) => {
        setRankingItems(response?.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  function handlePreviousButtonClicked() {
    if (rankingPage <= 0) return; //현재 페이지가 0 이하일 경우 수행하지 않고 반환
    
    // 이전 페이지 요청 수행
    axiosInstance
      .get(`${BASE_URL}/api/item/ranking/view_count?page=${rankingPage-1}&size=${DEFAULT_RANKING_FETCH_SIZE}`)
      .then((response) => {
        setRankingItems(response?.data);
      })
      .catch((err) => {
        console.log(err)
      })

    
    setRankingPage((prev) => prev - 1); //현재 페이지 감소
  }

  function handleNextButtonClicked() {
    if (rankingPage >= MAXIMUM_RANKING_PAGE-1) return; //현재 페이지가 최대 페이지 이상일 경우 수행하지 않고 반환

    axiosInstance
      .get(`${BASE_URL}/api/item/ranking/view_count?page=${rankingPage+1}&size=${DEFAULT_RANKING_FETCH_SIZE}`)
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
          
          <div className="ranking-items">
          {
            rankingItems != null && rankingItems?.length > 0 &&
            rankingItems?.map((item) => {
              return (
                <div key={`item-rank${item.rank}`}>
                  <a href={`/item/${item.itemId}`}>
                    <div className="single-ranking-item" >

                      <span className="item-rank-text">{`${item.rank + rankingPage * DEFAULT_RANKING_FETCH_SIZE}위 `}</span>
                      <img src={`${ASSETS_URL}/images/item/${item.itemId}.png`}></img>
                      <span>{`${item.name}`}</span><span>{` (${item.viewCount}회)`}</span>

                    </div>
                  </a>
                </div>
              )
            })
            }
          </div>
          
        </div>
        <section className="item-ranking-page-controller-container">
          <button
            className="item-ranking-button"
            onClick={handlePreviousButtonClicked}
          >
            <img src={`${ASSETS_URL}/images/etc/previous.png`} />
          </button>
          <span>{`${rankingPage + 1}/${MAXIMUM_RANKING_PAGE}`}</span>
          <button
            className="item-ranking-button"
            onClick={handleNextButtonClicked}
          >
            <img src={`${ASSETS_URL}/images/etc/next.png`} />
          </button>
        </section>
        
        
      </section>
    </>
  );
}