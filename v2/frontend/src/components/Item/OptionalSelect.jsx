import { useEffect, useState } from "react";
import { STATUS_NAME } from "../../global/status";

export default function OptionSelect({ statusInfo, optionSelectHandler }) {

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    const newOptionList = []

    const keys = Object.keys(statusInfo);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = statusInfo[key];

      if (value.lower > 0 || value.upper > 0) {
        newOptionList.push({name: key, ...statusInfo[key]});
      }
    }

    console.log(newOptionList)
    setOptionList(newOptionList);

  }, [statusInfo])

  // function getArrayFromRange(min, max) {
  //   return [...Array(max - min + 1).keys()].map((i) => i + min);
  // }

  return (
    <>
      {
        // console.log(optionList)
        optionList.map((option) => {
          return (
            <select key={`${option.name}_option`} className="form-select form-select-sm" onChange={optionSelectHandler} defaultValue={option.normal}>
              {
                [...Array(option.lower).keys()].map((i) => {
                  console.log(`${STATUS_NAME.get(option.name)}-${i+1}`)
                  return <option key={`${option.name}_lower_${i+1}`} value={option.normal-(i+1)}>{`${STATUS_NAME.get(option.name)}-${i+1}`}</option>
                })

              }
              {
                <option value={option.normal}>{`${STATUS_NAME.get(option.name)} 정옵`}</option>
              }
              {
                [...Array(option.upper).keys()].map((i) => {
                  console.log(`${STATUS_NAME.get(option.name)}+${i+1}`)
                  return <option key={`${option.name}_upper_${i+1}`} value={option.normal+(i+1)}>{`${STATUS_NAME.get(option.name)}+${i+1}`}</option>
                })
              }
            </select>
          );
        })
      }
    </>
  );

}