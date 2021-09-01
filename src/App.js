import AuthForm from './pages/AuthForm';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import DiningHall from './pages/DiningHall';
import Kitchen from './pages/Kitchen';
import { Fragment, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, area, login } = authCtx;

  const auth = getAuth();

  // const checkUser = () => {
  //   const user = auth.currentUser;

  //   if (user) {
  //     console.log(user);
  //   } else {
  //     console.log(user, 'not logged in');
  //   }
  // };

  console.log('working');

  useEffect(() => {
    console.log('effect working');

    const area = localStorage.getItem('area');
    onAuthStateChanged(auth, (user) => {
      if (user && area) login(area);
    });
  }, [login, auth]);

  const logoutHandler = () => {
    authCtx.logout();
    auth.signOut();
  };

  // const checkContext = () => {
  //   console.log(authCtx);
  // };

  const kitchenIsAvailable =
    (isLoggedIn && area === 'kitchen') || area === 'observer';
  const diningIsAvailable =
    (isLoggedIn && area === 'dining_hall') || area === 'observer';

  return (
    <Fragment>
      {/* <Link to='/auth'>Log in</Link> */}
      {/* <button onClick={checkUser}>check user is logged in</button>
        <button onClick={checkContext}>check context</button> */}
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
          {!isLoggedIn && <AuthForm />}
          {isLoggedIn && (
            <Redirect to={area === 'kitchen' ? '/kitchen' : '/dining-hall'} />
          )}
        </Route>

        {diningIsAvailable && (
          <Route path='/dining-hall'>
            <DiningHall />
            {/* <p>Dining hall</p> */}
          </Route>
        )}

        {kitchenIsAvailable && (
          <Route path='/kitchen'>
            <Kitchen />
            {/* <p>Kitchen</p> */}
          </Route>
        )}

        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
