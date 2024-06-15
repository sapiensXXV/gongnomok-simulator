import { useRecoilValue } from "recoil"
import { LoginState, MemberState } from "../global-state/State"
import { Navigate, Outlet } from "react-router-dom"
import Login from "../Login"

export default function AdminPrivateRoutes() {

  const memberState = useRecoilValue(MemberState)
  const loginState = useRecoilValue(LoginState)

  return (
    memberState === "ADMIN" ? <Outlet/> : <Navigate to='/' />
  )
}