import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 백엔드 proxy target 은 환경변수 DEV_PROXY_TARGET 으로 제어합니다.
//   - 미지정: http://localhost:8080 (로컬 backend 를 직접 띄울 때)
//   - https://gongnomok.com 으로 지정하면 vite 가 운영 백엔드로 forward
//
// path rewrite 규칙은 target 에 따라 자동으로 갈립니다:
//   - 로컬 backend (Spring) 는 /items 로 매핑되어 있어 /api prefix 를 제거.
//   - 운영은 nginx 가 /api/* 를 그대로 백엔드로 라우팅하므로 prefix 유지.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.DEV_PROXY_TARGET || 'http://localhost:8080'
  const isLocalBackend = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(proxyTarget)

  return {
    publicDir: 'public',
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          ...(isLocalBackend && { rewrite: path => path.replace(/^\/api/, '') }),
        }
      }
    }
  }
})
