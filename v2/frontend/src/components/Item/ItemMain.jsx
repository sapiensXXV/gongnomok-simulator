import { useEffect, useState } from "react";

import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";

export default function ItemMain() {

  const [itemName, setItemName] = useState('');
  const [job, setJob] = useState('COMMON');
  const [minLevel, setMinLevel] = useState(0);
  const [category, setCategory] = useState('ONE_HANDED_SWORD')

  const [itemList, setItemList] = useState([]);  

  // 화면에 접속하자마자 검색이 필요하다.
  useEffect(() => {
    console.log(`아이템 첫 로딩`)
    axios
      .get('/api/items')
      .then((res) => {
        
        setItemList(res.data.items); // 조회 결과 아이템
        console.log(res.data.items)

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
    setJob(e.target.value)
    // console.log(`job = ${job}`)
  }

  const handleMinLevel = (e) => {
    setMinLevel(e.target.value);
    // console.log(`new min level = ${minLevel}`)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
    // console.log(`category change = ${category}`);
  }

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const submitForm = {
      name: itemName,
      job: job,
      minLevel: minLevel,
      category: category
    }

    axios
      .post('/api/items', submitForm)
      .then((res) => {
        console.log(res)
        // res에서 데이터를 가져온다.
        setItemList(res.data.items)
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
      <section className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <section className="col-md-12 bg-light rounded py-3">
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


          <div className="col-md-8">
            <section className="col-md-12 bg-light rounded py-3 px-3 item-list-container">
              <ItemList itemList={itemList}/>
            </section>
          </div>

        </div>
      </section>

    </>
  ) 
}