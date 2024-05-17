
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URI } from "../global/uri";
import { useRecoilState } from "recoil";
import { LoginState, MemberState } from "./global-state/State";



export default function Login () {

  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [loginState, setLoginState] = useRecoilState(LoginState)
  const [memberState, setMemberState] = useRecoilState(MemberState)

  const handleIdChange = (e) => {
    e.preventDefault();
    setInputId(e.target.value)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setInputPassword(e.target.value)
  }

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${BASE_URI}/api/login`, {
      id: inputId,
      password: inputPassword
    }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setHasError(false);
        setLoginState(true);
        setMemberState(res.data.role);
        navigate('/');
      })
      .catch((err) => {
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