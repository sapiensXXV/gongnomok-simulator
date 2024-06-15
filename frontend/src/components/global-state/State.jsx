import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { USER } from './state-const';

const { persistAtom } = recoilPersist();

export const LOGIN_STATE = "LOGIN_STATE";
export const MEMBER_STATE = "MEMBER_STATE";

export const LoginState = atom({
  key: LOGIN_STATE,
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const MemberState = atom({
  key: MEMBER_STATE,
  default: USER,
  effects_UNSTABLE: [persistAtom]
})