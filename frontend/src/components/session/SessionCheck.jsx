import { useSetRecoilState } from "recoil";
import { LoginState, MemberState } from "../global-state/State";
import axios from "axios";
import { BASE_URI } from "../../global/uri";
import { GUEST } from "../global-state/state-const";
import { useEffect } from "react";

function SessionCheck() {

  const setMemberState = useSetRecoilState(MemberState);
  const setLoginState = useSetRecoilState(LoginState); // MemberState가 GUEST라면 로그인 한 것이 아님.

  useEffect(() => {
    const checkSession = async () => {
      console.log('session check')
      try {
        const response = await axios.get(`${BASE_URI}/api/auth/check`)
        setMemberState(response.data.role);
        if (response.data.role === GUEST) {
          setLoginState(false);
        } else {
          setLoginState(true);
        }
      } catch (err) {
        setMemberState(GUEST)
        setLoginState(false);
      }
    }

    const intervalId = setInterval(checkSession, 5 * 60 * 1000) // 5min
    return () => {
      clearInterval(intervalId);
    }
  }, [setMemberState, setLoginState])

  return null;

}

export default SessionCheck;