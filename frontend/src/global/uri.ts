// 요청 URI.
// 빈 문자열이면 axios 가 같은 origin 으로 호출하고 vite proxy(/api) 또는 운영 nginx 가 처리합니다.
export const BASE_URL: string = import.meta.env.VITE_REQUEST_API_URL ?? ''
export const ASSETS_URL: string = import.meta.env.VITE_ASSETS_URL ?? ''
