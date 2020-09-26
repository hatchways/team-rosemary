import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName: null,
  email: null,
  token: null,
  login: () => {},
  logout: () => {}
});
