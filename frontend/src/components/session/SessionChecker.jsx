import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginState, MemberState } from "../global-state/State";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../../global/uri";

export default function SessionChecker() {

  // const [loginState, setLoginState] = useRecoilState(LoginState)
  // const [memberState, setMemberState] = useRecoilState(MemberState)
  const setLoginState = useSetRecoilState(LoginState)
  const memberState = useSetRecoilState(MemberState)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/api/auth/check`)
      }
    }
  }, [])

  return null;
}