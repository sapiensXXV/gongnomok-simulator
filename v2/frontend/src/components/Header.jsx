
import logo from "/src/img/nomok.png";

export default function Header() {
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img className="mr-2" src={logo} />
            <span>메이플 주문서 시뮬레이터</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/login" className="nav-link">관리자 로그인</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex" role="admin-active">
        </div>
      </nav>

    </>
  );
}