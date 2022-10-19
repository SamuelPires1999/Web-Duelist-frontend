export type Maybe<T> = T | null | undefined

const JWT_TOKEN_KEY = 'DUELIST_TOKEN'

export const getAuthToken = () => localStorage.getItem(JWT_TOKEN_KEY)

export const updateAuthToken = (token?: Maybe<string>) => {
  if (!token) {
    localStorage.removeItem(JWT_TOKEN_KEY)
  } else {
    localStorage.setItem(JWT_TOKEN_KEY, token)
  }
}
