import { useEffect, useState, useRef } from "react";

import ItemCondition from "./condition/ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";

import { DEFAULT_FETCH_SIZE } from "../../global/item";
import { BASE_URI } from "../../global/uri";
import FeedbackBanner from "../banner/FeedbackBanner";
import InformBanner from "../banner/InformBanner";
import { INITIAL_SEARCH_CONDITION } from "./condition/search";

export default function ItemMain() {

  // const [searchCondition, setSearchCondition] = useState(INITIAL_SEARCH_CONDITION)

  const [itemList, setItemList] = useState([]);  
  const [isItemLoaded, setIsItemLoaded] = useState(false);
  const nextPage = useRef(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  
  useEffect(() => {
    searchItems();
  }, []);

  function searchItems() {
    setIsItemLoaded(false);
    axios
      .get(`${BASE_URI}/api/items?page=0&size=${DEFAULT_FETCH_SIZE}`)
      .then((res) => {
        const items = res?.data?.items;
        if (items === undefined || items === null) {
          setItemList([]);
        } else {
          setItemList(items);
        }
        setIsItemLoaded(true);

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);

        nextPage.current += 1
      })
      .catch((err) => {
        console.log(err)
        setItemList([]); // 에러 발생시 아무런 아이템도 나타내지 않는다.
      });
  }

  function searchItemsWithCondition(searchCondition) {
    axios
      .post(`${BASE_URI}/api/items?page=${nextPage.current}&size=${DEFAULT_FETCH_SIZE}`, searchCondition, { withCredentials: true })
      .then((res) => {
        setItemList([...res.data.items])
        setIsItemLoaded(true)

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);  
        nextPage.current += 1
      })
      .catch((err) => {
        console.log(err)
        setItemList([]);
      })
  }



  function doSearchWithCondition(searchCondition) {
    // 바뀐 컨디션 데이터를 사용해서 검색 처리
    nextPage.current = 0; // 페이지 초기화
    searchItemsWithCondition(searchCondition);
  }

  function handleMoreItemButton(e) {
    e.preventDefault()
    searchItemsWithCondition();
  }

  return (
    <>
      <section className="mt-3">
        <div className="row mb-3">
          <section>
            <FeedbackBanner/>
            <InformBanner/>
          </section>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-4">
            <section className="col-md-12">
              <ItemCondition
                // handleItemNameChange={handleItemNameChange}
                // handleMinLevelChange={handleMinLevelChange}
                // handleJobsChange={handleJobsChange}
                // handleCategoryChange={handleCategoryChange}
                doSearch={doSearchWithCondition}
              />
            </section>
          </div>  
          <div className="col-lg-12 col-xl-8">
            <section>
              <ItemList 
                itemList={itemList} 
                isItemLoaded={isItemLoaded}
                hasNextPage={hasNextPage}
                handleMoreItemButton={handleMoreItemButton}
              />
            </section>
          </div>
        </div>
      </section>

    </>
  ) 
}