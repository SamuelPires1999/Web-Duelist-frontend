import React, { useCallback, useMemo, useState } from 'react'

import { Maybe, getAuthToken, updateAuthToken } from './security'

export interface AuthContextValue {
  token: Maybe<string> | undefined
  signin: (token: Maybe<string> | undefined, cb: VoidFunction) => void
  signout: (cb: VoidFunction) => void
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<AuthContextValue['token']>(() => getAuthToken())

  const signin = useCallback<AuthContextValue['signin']>((token, cb) => {
    updateAuthToken(token)
    setUserToken(token)
    cb()
  }, [])

  const signout = useCallback<AuthContextValue['signout']>((cb) => {
    setUserToken(null)
    updateAuthToken()
    cb()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      token: userToken,
      signin,
      signout,
    }),
    [userToken, signin, signout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = React.createContext<AuthContextValue>(null!)