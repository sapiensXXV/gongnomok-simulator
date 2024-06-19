import React from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { MemberState } from "../../contexts/member-state/MemberState";
import { LoginState } from "../../contexts/LoginState";
import axios from "axios";
import { MemberAuth } from "../../contexts/member-state/MemberAuth.interface";
import { guestMember, isAdmin } from "../../contexts/member-state/MemberStatus";

export const AppHeader: React.FC = (props) => {

  const navigate = useNavigate();

  const [memberState, setMemberState] = useRecoilState<MemberAuth>(MemberState);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  async function handleLogoutButton() {
    try {
      const response = await axios.post(`${import.meta.env.BASE_URL}/api/logout`)
      if (response.status === 204) {
        setLoginState(false);
        setMemberState(guestMember);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
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
              isAdmin(memberState) ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">관리</a>

                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/manage/item/new">아이템 등록</a></li>
                    <li><a className="dropdown-item" href="/manage/item">아이템 관리</a></li>
                    <li><a className="dropdown-item" href="/manage/comment">신고댓글 관리</a></li>
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
                  onClick={handleLogoutButton}
                >로그아웃</button>
              </form>
            ) : null
          }

        </div>
      </div>
    </nav>
  )
}