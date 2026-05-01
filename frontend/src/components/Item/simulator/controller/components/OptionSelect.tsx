import { useEffect, useState, type ChangeEvent } from 'react'
import { STATUS_NAME } from '../../../../../global/status'
import type { ItemStatus, StatusKey, StatusRange } from '../../../../../types/item'

interface OptionRow extends StatusRange {
  name: StatusKey
}

interface Props {
  statusInfo: ItemStatus | undefined
  optionSelectHandler: (e: ChangeEvent<HTMLSelectElement>, statusName: StatusKey) => void
}

export default function OptionSelect({ statusInfo, optionSelectHandler }: Props) {
  const [optionList, setOptionList] = useState<OptionRow[]>([])

  useEffect(() => {
    if (statusInfo == null) return
    const next: OptionRow[] = []
    for (const key of Object.keys(statusInfo) as StatusKey[]) {
      const value = statusInfo[key]
      if (value.lower > 0 || value.upper > 0) {
        next.push({ name: key, ...value })
      }
    }
    setOptionList(next)
  }, [statusInfo])

  if (optionList.length === 0) return null

  return (
    <>
      {optionList.map((option) => (
        <select
          key={`${option.name}_option`}
          className="form-select form-select-sm option-select-item"
          onChange={(e) => optionSelectHandler(e, option.name)}
          defaultValue={option.normal}
        >
          {[...Array(option.lower).keys()].reverse().map((i) => (
            <option
              key={`${option.name}_lower_${i + 1}`}
              value={option.normal - (i + 1)}
            >
              {`${STATUS_NAME.get(option.name)}-${i + 1}`}
            </option>
          ))}
          <option value={option.normal}>{`${STATUS_NAME.get(option.name)} 정옵`}</option>
          {[...Array(option.upper).keys()].map((i) => (
            <option
              key={`${option.name}_upper_${i + 1}`}
              value={option.normal + (i + 1)}
            >
              {`${STATUS_NAME.get(option.name)}+${i + 1}`}
            </option>
          ))}
        </select>
      ))}
    </>
  )
}
