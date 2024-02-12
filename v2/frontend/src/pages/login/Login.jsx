import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

export default function Login() {

  const navigate = useNavigate();
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isLoginMember, setIsLoginMember] = useState(false);

  function submitLoginForm() {
    console.log('click login')
    console.log(`id = ${inputId}`)
    console.log(`password = ${inputPassword}`)

    const form = {
      id: inputId,
      password: inputPassword
    }

    useEffect(() => {
      if(isLoginMember) {
        navigate("/");
      }
    }, []);

    fetch('http://localhost:8080/login', {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(form)
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      setIsLoginMember(true)
    })
    .catch((error) => {
      console.log(error)
    })

    // axios
    //   .post("/login", {
    //     id: inputId,
    //     password: inputPassword
    //   })
    //   .then(function (response) {
    //     console.log(response)
    //     navigate('/');
        
    //   })
    //   .catch(function (error) {
    //     console.log(`${error.data.status}`)
    //   });

  }

  function handleInputId(e) {
    setInputId(e.target.value)
  }

  function handleInputPassword(e) {
    setInputPassword(e.target.value)
  }

  return (
    <>
      <form className="text-start mt-3">
        <div className="justify-content-center text-center mt-3">
          <h2>관리자 로그인</h2>
          <div className="d-grid gap-2 mt-3 text-start">
            <div >
              <label htmlFor="idInput">아이디</label>
              <input
                className="form-control mt-1"
                type="text"
                id="idInput"
                placeholder="아이디를 입력하세요"
                value={inputId}
                onChange={(e) => handleInputId(e)}
              />
            </div>
            <div>
              <label htmlFor="passwordInput">패스워드</label>
              <input
                className="form-control mt-2"
                type="password"
                id="passwordInput"
                placeholder="패스워드를 입력하세요"
                value={inputPassword}
                onChange={(e) => handleInputPassword(e)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => submitLoginForm()}>로그인</button>
          </div>
        </div>
      </form>
    </>
  )
}