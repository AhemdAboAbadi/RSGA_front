export type AuthUser = null | Record<string, any>

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
}

export type AuthContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export type UserCredentials = {
  email: string
  password?: string
}
