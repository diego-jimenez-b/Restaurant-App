import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from './auth-context';

const initialUserState = { isLoggedIn: false, area: '' };

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initialUserState);
  const history = useHistory();

  const loginHandler = useCallback(
    (area) => {
      setUser({
        isLoggedIn: true,
        area: area,
      });
      localStorage.setItem('area', area);

      if (area === 'kitchen') history.replace('/kitchen');
      else history.replace('/dining-hall');
    },
    [history]
  );

  const logoutHandler = () => {
    setUser(initialUserState);
    history.push('/auth');

    localStorage.removeItem('area');
  };

  const authContext = {
    isLoggedIn: user.isLoggedIn,
    area: user.area,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
