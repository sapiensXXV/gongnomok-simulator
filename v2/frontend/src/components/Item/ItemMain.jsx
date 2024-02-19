import { useEffect, useState } from "react";

import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";

export default function ItemMain() {

  const [itemName, setItemName] = useState('');
  const [job, setJob] = useState(null);
  const [minLevel, setMinLevel] = useState(0);
  const [category, setCategory] = useState(null)

  const [itemList, setItemList] = useState([]);  
  const [isItemLoaded, setIsItemLoaded] = useState(false);


  // 화면에 접속하자마자 검색이 필요하다.
  useEffect(() => {
    // console.log(`아이템 첫 로딩`)
    axios
      .get('/api/items')
      .then((res) => {
        
        setItemList(res.data.items); // 조회 결과 아이템
        // console.log(res.data.items)
        setIsItemLoaded(true);
      })
      .catch((err) => {
        // console.log(err);
        setItemList([]); // 에러 발생시 아무런 아이템도 나타내지 않는다.
      });
    }, []);

  const handleItemName = (e) => {
    setItemName(e.target.value)
    // console.log(itemName);
  }

  const handleJob = (e) => {
    console.log(e.target.value);
    setJob(e.target.value)  
    // console.log(`job = ${job}`)
  }

  const handleMinLevel = (e) => {
    setMinLevel(e.target.value);
    // console.log(`new min level = ${minLevel}`)
  }

  const handleCategory = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    // console.log(`category change = ${category}`);
  }

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setIsItemLoaded(false);
    const submitForm = {
      name: itemName,
      job: job === "NONE" ? null : job,
      minLevel: minLevel,
      category: category === "NONE" ? null : category
    }

    axios
      .post('/api/items', submitForm)
      .then((res) => {
        console.log(res)
        // res에서 데이터를 가져온다.
        setItemList(res.data.items)
        setIsItemLoaded(true);
        console.log(`itemList=${itemList}`)
      })
      .catch((err) => {
        console.log(err)
        setItemList([]);
      })

    console.log(submitForm);
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
                handleSubmitButton={handleSubmitButton}
              />
            </section>
          </div>


          <div className="col-lg-12 col-xl-8">
            <section>
              <ItemList itemList={itemList} isItemLoaded={isItemLoaded}/>
            </section>
          </div>

        </div>
      </section>

    </>
  ) 
}