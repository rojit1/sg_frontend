import { useState, createContext } from 'react';

export const AuthContext = createContext()

export function AuthProvider(props) {
  const tok = localStorage.getItem('auth_token') || null
  const [authToken, setAuthToken] = useState(tok)
  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      {props.children}
    </AuthContext.Provider>
  )
}
