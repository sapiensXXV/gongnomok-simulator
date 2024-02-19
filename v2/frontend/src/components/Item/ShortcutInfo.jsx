// import { memo } from "react"

import { useEffect } from "react"

export default function ShortcutInfo({ shortcut, description }) {

  useEffect(() => {
    console.log(shortcut)
  }, [])

  return (
    <>
      
        <span className="shortcut-description">{description}</span>
      
    </>
  )
}