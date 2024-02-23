import axios from "axios";
import { useState } from "react"

export default function Test() {

  const [data, setData] = useState('');

  const handleClick = () => {
    axios.get('/api/test')
      .then((res) => {
        console.log(res)
        setData(res.data);
      }) 
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>

      <p>전달된 데이터: {data}</p>
      <button onClick={handleClick}>데이터 전달받기</button>

    </>
  )
}