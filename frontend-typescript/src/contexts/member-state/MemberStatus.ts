import { MemberAuth } from "./MemberAuth.interface"

export const guestMember: MemberAuth = {
  state: "GUEST"
}

export const userMember: MemberAuth = {
  state: "USER"
}

export const adminMember: MemberAuth = {
  state: "ADMIN"
}

export const isGuest = (auth: MemberAuth): boolean => {
  return auth.state === "GUEST";
}

export const isUser = (auth: MemberAuth): boolean => {
  return auth.state === "USER";
}

export const isAdmin = (auth: MemberAuth): boolean => {
  return auth.state === "ADMIN";
}