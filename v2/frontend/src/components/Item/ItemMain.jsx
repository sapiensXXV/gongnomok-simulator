import { useEffect, useState, useRef } from "react";

import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

export default function ItemMain() {

  const [itemName, setItemName] = useState('');
  const [job, setJob] = useState("COMMON");
  const [minLevel, setMinLevel] = useState(0);
  const [category, setCategory] = useState("NONE")

  const [itemList, setItemList] = useState([]);  
  const [isItemLoaded, setIsItemLoaded] = useState(false);

  const isLoading = useRef(false);
  // const searchCondition = useRef(DEFAULT_ITEM_CONDITION);
  const nextPage = useRef(0);
  const hasNextPage = useRef(false);

  // 화면에 접속하자마자 검색이 필요하다.
  useEffect(() => {
    console.log(`아이템 첫 로딩`)
    isLoading.current = true;
    axios
      .get('/api/items?page=0&size=50')
      .then((res) => {
        setItemList(res.data.items); // 조회 결과 아이템
        setIsItemLoaded(true);

        if (res.data.items.length < 50) hasNextPage.current = false;
        else hasNextPage.current = true;

        nextPage.current += 1
        isLoading.current = false;

        console.log(res)
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

  function handleConditionSearch() {

    console.log(`검색 버튼이 눌렸다.`)
    console.log(`/api/items?page=${nextPage.current}&size=50`)
    console.log(`searchCondition=${getSearchCondition()}`);
    console.log(`hasNextPage=${hasNextPage.current}`)
    console.log(`isLoading=${isLoading.current}`)

    isLoading.current = true;

    axios
    .post('/api/items?page=0&size=50', getSearchCondition())
    .then((res) => {
      console.log(res)
      setItemList(...res.data.items)
      setIsItemLoaded(true); // 아이템 로딩 완료 => 스피너 사라짐

      isLoading.current = false;
      nextPage.current += 1
      if (res.data.items.length < 50) hasNextPage.current = false;
    })
    .catch((err) => {
      console.log(err)
      setItemList([]);
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
              />
            </section>
          </div>
        </div>
      </section>

    </>
  ) 
}