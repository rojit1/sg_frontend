import { useState, createContext, useContext } from 'react';

export const AuthContext = createContext()

export function AuthProvider(props) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'))
  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      {props.children}
    </AuthContext.Provider>
  )
}
