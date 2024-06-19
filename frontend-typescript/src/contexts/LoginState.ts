import { atom } from "recoil"
import { persistAtom } from "./persistAtom"

const LOGIN_STATE = "LOGIN_STATE"
export const LoginState = atom({
  key: LOGIN_STATE,
  default: false,
  effects_UNSTABLE: [persistAtom]
})