
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";



export default function Login () {

  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleIdChange = (e) => {
    e.preventDefault();
    setInputId(e.target.value)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setInputPassword(e.target.value)
  }


  // const dispatch = useDispatch();
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   let body = {
  //     id: inputId,
  //     password: inputPassword
  //   }

  //   dispatch(loginMember(body))
  //     .then(response => {
  //       if(response.payload.loginSuccess) {
  //         setHasError(false);
  //         props.history.push('/')
  //       } else {
  //         setHasError(true);
  //       }
  //     })

  // }
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('로그인 폼 제출')
    console.log(`id = ${inputId}, password = ${inputPassword}`)
    axios.post('/api/login', {
      id: inputId,
      password: inputPassword
    })
      .then((res) => {
        console.log(res)
        setHasError(false)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setHasError(true)
      })
  }

  return (
    <>

      <section className="justify-content-center text-center mt-3">
        <h2>관리자 로그인</h2>
        <div className="text-start text-danger">
          {hasError && <p>아이디나 패스워드를 잘못 입력하였습니다.</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-start">
            <div className="d-grid gap-2">
              <div>
                <label htmlFor="id" className="form-label">아이디</label>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  aria-describedby="id-input"
                  placeholder="아이디를 입력하세요"
                  value={inputId}
                  onChange={handleIdChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="form-label">패스워드</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  aria-describedby="password-input"
                  placeholder="비밀번호를 입력하세요"
                  value={inputPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className=" btn btn-success mt-3" type="submit" >로그인</button>
            </div>
          </div>
        </form>

      </section >
    </>
  );
}