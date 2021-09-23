import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import AuthForm from './pages/AuthForm';
import DiningHall from './pages/DiningHall';
import Kitchen from './pages/Kitchen';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';

let isInitial = true;

function App() {
  const { isLoggedIn, area } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const auth = getAuth();

  useEffect(() => {
    const area = localStorage.getItem('area');
    onAuthStateChanged(auth, (user) => {
      if (user && area) dispatch(authActions.login(area));
    });
  }, [dispatch, auth]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isLoggedIn) {
      history.push(area === 'kitchen' ? '/kitchen' : '/dining-hall');
    } else {
      history.push('/auth');
    }
  }, [isLoggedIn, area, history]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    auth.signOut();
  };

  return (
    <Fragment>
      {area === 'observer' && (
        <nav className='nav'>
          <Link to='/dining-hall' className='btn'>
            Dining hall
          </Link>
          <Link to='/kitchen' className='btn'>
            Kitchen
          </Link>
        </nav>
      )}

      {isLoggedIn && (
        <button onClick={logoutHandler} className='btn logout'>
          logout
        </button>
      )}

      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>

        <Route path='/auth'>
          <AuthForm />
        </Route>

        <Route path='/dining-hall'>
          <DiningHall />
        </Route>

        <Route path='/kitchen'>
          <Kitchen />
        </Route>

        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
