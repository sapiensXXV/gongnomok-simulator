// import logo from "../assets/logo.png"

import { useRecoilState, useRecoilValue } from "recoil"
import { LoginState, MemberState } from "./global-state/State"
import { ADMIN, GUEST } from "./global-state/state-const"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../global/uri"

export default function Header() {

  const [memberState, setMemberState] = useRecoilState(MemberState)
  const [loginState, setLoginState] = useRecoilState(LoginState)

  const navigate = useNavigate();

  async function handleLogoutButtonClicked(e) {

    try {
      const response = await axios.post(`${BASE_URL}/api/logout`)
      if (response.status === 204) {
        setLoginState(false);
        setMemberState(GUEST)
        navigate('/') // goto root
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="header-title">
            <a className="navbar-brand" href="/">
              <img src="/images/logo.png" alt="gongnomok-home" /><span>메이플 주문서 시뮬레이터</span>
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                memberState === ADMIN ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      관리
                    </a>

                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/manage/item/new">아이템 등록</a></li>
                      <li><a className="dropdown-item" href="/manage/item">아이템 관리</a></li>
                      <li><a className="dropdown-item" href="/manage/comment">신고댓글 관리</a></li>
                      <li><a className="dropdown-item" href="/manage/banword">금칙어 관리</a></li>
                    </ul>
                  </li>
                ) : null
              }
              {
                !loginState ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/login">관리자 로그인</a>
                  </li>
                ) : null
              }
            </ul>
            {
              loginState ? (
                <form className="d-flex" role="logout">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={handleLogoutButtonClicked}
                  >로그아웃</button>
                </form>
              ) : null
            }

          </div>
        </div>
      </nav>
    </>
  )
}