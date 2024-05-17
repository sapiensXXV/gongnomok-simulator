import { Navigate, Outlet } from "react-router-dom"
import { useRecoilState } from "recoil"
import { LOGIN_STATE, MEMBER_STATE } from "../global-state/State"



export default function LoginPrivateRoutes() {

  const { isLoginMember } = useRecoilState(LOGIN_STATE)

  return (
    isLoginMember ? <Outlet/> : <Navigate to={`/login`} />
  );
}