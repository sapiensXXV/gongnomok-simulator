import { useEffect, useState } from "react";
import { STATUS_NAME } from "../../global/status";

export default function OptionSelect({ statusInfo, optionSelectHandler }) {

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    const newOptionList = []

    if (statusInfo != null) {
      const keys = Object.keys(statusInfo);
      for (let i = 0; i < keys?.length; i++) {
        
        const key = keys[i];
        const value = statusInfo[key];

        if (value.lower > 0 || value.upper > 0) {
          newOptionList.push({ name: key, ...statusInfo[key] });
        }
      }

      setOptionList(newOptionList);
    }

  }, [statusInfo])

  return (
    <>

      {
        optionList?.length > 0 &&
        optionList?.map((option) => {
          return (
            <select
              key={`${option.name}_option`}
              className="form-select form-select-sm option-select-item"
              onChange={(e) => optionSelectHandler(e, option.name)}
              defaultValue={option.normal}
            >
              {
                [...Array(option.lower).keys()].reverse().map((i) => {
                  return <option
                    key={`${option.name}_lower_${i + 1}`}
                    value={option.normal - (i + 1)}
                  >
                    {`${STATUS_NAME.get(option.name)}-${i + 1}`}
                  </option>
                })
              }
              {
                <option value={option.normal}>{`${STATUS_NAME.get(option.name)} 정옵`}</option>
              }
              {
                [...Array(option.upper).keys()].map((i) => {
                  return <option
                    key={`${option.name}_upper_${i + 1}`}
                    value={option.normal + (i + 1)}
                  >
                    {`${STATUS_NAME.get(option.name)}+${i + 1}`}
                  </option>
                })
              }
            </select>
          );
        })
      }
    </>
  );

}