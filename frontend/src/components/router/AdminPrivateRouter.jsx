import { useRecoilValue } from "recoil"
import { LoginState, MemberState } from "../global-state/State"
import { Navigate, Outlet } from "react-router-dom"
import Login from "../Login"

export default function AdminPrivateRoutes() {

  const memberState = useRecoilValue(MemberState)

  return (
    memberState === "ADMIN" ? <Outlet/> : <Navigate to='/' />
  )
}