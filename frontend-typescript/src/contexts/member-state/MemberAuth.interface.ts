export interface MemberAuth {
  state: StateConst
}

type StateConst = "GUEST" | "USER" | "ADMIN";