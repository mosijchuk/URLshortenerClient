import { createContext } from "react";

const noop = () => {}

export type AuthType = {
  login: (jwtToken:string, id:string) => void
  logout: () => void
  token: string | null
  userId: string | null
  ready?: boolean
  isAuthenticated?: boolean
}


export const AuthContext = createContext<AuthType>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})