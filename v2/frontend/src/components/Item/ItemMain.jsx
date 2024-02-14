import { useState } from "react";

import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";
import axios from "axios";

export default function ItemMain() {

  const [itemName, setItemName] = useState('');
  const [job, setJob] = useState('COMMON');
  const [minLevel, setMinLevel] = useState(0);
  const [category, setCategory] = useState('ONE_HANDED_SWORD')


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

    console.log(submitForm);
  }

  return (
    <>
      <section className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <section className="col-md-12 bg-light rounded pb-2">
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
            <section className="col-md-12 bg-light rounded px-2 py-2">
              <ItemList />
            </section>
          </div>


        </div>
      </section>

    </>
  )
}