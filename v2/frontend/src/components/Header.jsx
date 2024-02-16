// import logo from "../assets/logo.png"

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <div className="header-title">
            <a href="/">
              <img src="/images/logo.png" width="35" />
              <span>메이플 주문서 시뮬레이터</span>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="header-item-nav nav-item">
                <a className="nav-link" href="/item/new">아이템 등록</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}