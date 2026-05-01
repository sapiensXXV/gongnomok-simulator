# gongnomok-simulator / frontend

메이플 주문서 시뮬레이터의 프론트엔드. React 18 + Vite 5.

## 빠른 시작

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 http://localhost:5173 을 엽니다.

## 환경 변수

루트의 `.env.development` 가 기본값을 제공하며, 개인 오버라이드는 `.env.development.local` 에 작성하세요 (gitignored).

| 변수 | 설명 |
|---|---|
| `VITE_REQUEST_API_URL` | 클라이언트가 호출할 백엔드 base URL. 비워두면 axios 가 `/api/...` 로 호출하고 vite proxy 가 `DEV_PROXY_TARGET` 으로 forward. |
| `VITE_ASSETS_URL` | 이미지·사운드 등 정적 자원 URL. 빈 값이면 `frontend/public/` 을 같은 origin 으로 서빙 (운영도 이 패턴). |
| `DEV_PROXY_TARGET` | vite dev 서버가 `/api/*` 요청을 forward 할 백엔드. 비워두면 `http://localhost:8080`. |

## 백엔드와 함께 띄우기

화면이 떴는데 아이템 목록이 비어 있다면 백엔드 연결이 안 된 상태입니다.

- **옵션 1 — 운영 백엔드 사용 (기본값)**: `.env.development` 의 `DEV_PROXY_TARGET=https://gongnomok.com` 으로 설정되어 있어 vite proxy 가 운영 백엔드로 forward 합니다. 별도 작업 없이 바로 실데이터로 동작.
- **옵션 2 — 로컬 백엔드 사용**: `../backend` 의 Spring Boot 서버를 `localhost:8080` 에서 실행한 뒤, `.env.development.local` 에 `DEV_PROXY_TARGET=http://localhost:8080` 으로 덮어쓰세요.

## 프로젝트 구조

```
frontend/
├── css/                    # 글로벌 CSS (현재 breakpoint 별 파일 분리 — Step B 에서 통합 예정)
├── public/
├── src/
│   ├── App.jsx             # 라우팅·전역 상태 루트
│   ├── main.jsx            # 엔트리 포인트
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Item/           # 메인 도메인 (시뮬레이터·아이템 리스트·댓글)
│   │   ├── banner/         # 공지·피드백 배너
│   │   ├── management/     # 관리자 화면
│   │   ├── router/
│   │   ├── session/
│   │   └── global-state/   # Recoil atom
│   └── global/             # API client·상수·유틸
└── vite.config.js          # /api proxy 설정 위치
```

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (HMR) |
| `npm run build` | 프로덕션 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run lint` | ESLint |

## 테크 스택

React 18 / Vite 5 / React Router 6 / Recoil / axios / styled-components / react-hotkeys-hook
