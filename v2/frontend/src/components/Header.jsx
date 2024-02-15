// import logo from "../assets/logo.png"

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
          <img className="mr-3" src="/images/logo.png" width="35" />
            <span className="title">GONGNOMOK.SITE</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/login">관리자로그인</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/item/new">아이템 등록</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}