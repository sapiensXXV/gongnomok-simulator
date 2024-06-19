import { atom } from "recoil"
import { persistAtom } from "../persistAtom"

const MEMBER_STATE = "MEMBER_STATE"

export const MemberState = atom({
  key: MEMBER_STATE,
  default: "USER",
  effects_UNSTABLE: [persistAtom]
})
