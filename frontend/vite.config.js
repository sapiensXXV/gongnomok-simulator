import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 백엔드 proxy target 은 환경변수 DEV_PROXY_TARGET 으로 제어합니다.
//   - 미지정: http://localhost:8080 (로컬 backend 를 직접 띄울 때)
//   - https://gongnomok.com 으로 지정하면 vite 가 운영 백엔드로 forward
//
// 모든 컨트롤러가 @RequestMapping("/api") 또는 그 하위 경로를 쓰므로,
// 로컬·운영 어느 쪽이든 /api prefix 를 그대로 유지합니다.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.DEV_PROXY_TARGET || 'http://localhost:8080'

  return {
    publicDir: 'public',
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
