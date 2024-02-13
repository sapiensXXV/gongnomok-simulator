import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function NewItem() {

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/item/new')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        const status = err.response.status
        if (status === 401) {
          console.log("상태코드 401 로그인 화면으로 가세요")
          navigate('/login')
        }
        navigate('/')
      })
  }, [])

  return (
    <>
      <h1>아이템 등록 페이지</h1>
    </>
  );

}