// import logo from "../assets/logo.png"

import { useRecoilValue } from "recoil"
import { LoginState, MemberState } from "./global-state/State"
import { ADMIN } from "./global-state/state-const"

export default function Header() {

  const memberState = useRecoilValue(MemberState)
  const loginState = useRecoilValue(LoginState)

  function handleLogoutButtonClicked(e) {

    console.log('handleLogoutButtonClicked')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="header-title">
            <a className="navbar-brand" href="/">
              <img src="/images/logo.png" alt="gongnomok-home" />메이플 주문서 시뮬레이터
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                !loginState ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/login">관리자 로그인</a>
                  </li>
                ) : <></>
              }

              {
                memberState === ADMIN ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/item/new">아이템 등록</a>
                  </li>
                ) : <></>
              }

            </ul>
            {
              loginState ? (
                <form className="d-flex" role="logout">
                  {/* <button className="btn btn-outline-success" type="button">Search</button> */}
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={handleLogoutButtonClicked}
                  >로그아웃</button>
                </form>
              ) : <></>
            }

          </div>
        </div>
      </nav>
    </>
  )
}