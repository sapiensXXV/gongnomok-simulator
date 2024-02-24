import { useEffect, useState, useRef } from "react";

import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";

import { DEFAULT_FETCH_SIZE } from "../../global/item";
import { BASE_URI } from "../../global/uri";

export default function ItemMain() {

  const [itemName, setItemName] = useState('');
  const [job, setJob] = useState("NONE");
  const [minLevel, setMinLevel] = useState(0);
  const [category, setCategory] = useState("NONE")

  const [itemList, setItemList] = useState([]);  
  const [isItemLoaded, setIsItemLoaded] = useState(false);
  // const searchCondition = useRef(DEFAULT_ITEM_CONDITION);
  const nextPage = useRef(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  // 화면에 접속하자마자 검색이 필요하다.
  useEffect(() => {
    setIsItemLoaded(false)
    axios
      .get(
          `${BASE_URI}/api/items?page=0&size=${DEFAULT_FETCH_SIZE}`, 
          { withCredentials: true }
        )
      .then((res) => {
        const items = res?.data?.items;
        if (items === undefined || items === null) {
          setItemList([]);
        } else {
          setItemList(items);
        }
        setItemList(res?.data?.items); // 조회 결과 아이템
        setIsItemLoaded(true);

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);

        nextPage.current += 1
      })
      .catch((err) => {
        console.log(err)
        setItemList([]); // 에러 발생시 아무런 아이템도 나타내지 않는다.
      });
  }, []);

  const handleItemName = (e) => {
    setItemName(e.target.value);
  }

  const handleJob = (e) => {

    setJob(e.target.value)
  }

  const handleMinLevel = (e) => {
    setMinLevel(e.target.value)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  function getSearchCondition() {
    return {
      name: itemName,
      job: job === "NONE" ? null : job,
      minLevel: minLevel,
      category: category === "NONE" ? null : category
    }
  }

  function handleConditionSearch(e) {
    e.preventDefault();
    setIsItemLoaded(false);
    axios
      .post(`${BASE_URI}/api/items?page=0&size=${DEFAULT_FETCH_SIZE}`, getSearchCondition(), { withCredentials: true })
      .then((res) => {
        setItemList([...res.data.items])
        setIsItemLoaded(true)

        nextPage.current = 1
        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);  
      })
      .catch((err) => {
        console.log(err)
        setItemList([]);
      })
  }

  function handleMoreItemButton(e) {
    e.preventDefault()
    setIsItemLoaded(false);
    axios
      .post(`${BASE_URI}/api/items?page=${nextPage.current}&size=${DEFAULT_FETCH_SIZE}`, getSearchCondition(), { withCredentials: true })
      .then((res) => {
        setItemList([...itemList, ...res.data.items])
        setIsItemLoaded(true);

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);

        nextPage.current += 1;
      })
      .catch((err) => {
        console.log(err);
        setItemList([])
      })
  }

  return (
    <>
      <section className="mt-3">
        <div className="row">
          <div className="col-lg-12 col-xl-4">
            <section className="col-md-12">
              <ItemCondition
                handleItemName={handleItemName}
                handleJob={handleJob}
                minLevel={minLevel}
                handleMinLevel={handleMinLevel} 
                handleCategory={handleCategory}
                handleSubmitButton={handleConditionSearch}
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