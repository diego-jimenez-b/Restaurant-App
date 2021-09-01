import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  area: '',
  login: (area) => {},
  logout: () => {},
});

export default AuthContext;
