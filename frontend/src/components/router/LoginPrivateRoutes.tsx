import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../global-state/State'

export default function LoginPrivateRoutes() {
  const isLoggedIn = useRecoilValue(LoginState)
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}
