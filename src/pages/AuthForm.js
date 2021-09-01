import { useContext, useRef, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');

  const authCtx = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const auth = getAuth();

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          console.log(userCredential.user);
          setIsLogin(true);
          alert(
            'You have successfully registered, please select an area to login'
          );
        })
        .catch((err) => alert(err.code));
    } else {
      if (selectedArea === '') {
        alert('select an area');
        return;
      }

      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          console.log(userCredential.user);
          authCtx.login(selectedArea);
        })
        .catch((err) => alert(err.code));
    }
  };

  const toggleFormHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const radioInputHandler = (event) => {
    setSelectedArea(event.target.value);
  };

  const passwordAutocomplete = isLogin ? 'current-password' : 'new-password';

  return (
    <div className={classes.form}>
      <h1 className={classes.title}>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Email: </label>
        <input ref={emailRef} type='text' id='email' autoComplete='email' />

        <label htmlFor='password'>Password: </label>
        <input
          ref={passwordRef}
          type='password'
          id='password'
          autoComplete={passwordAutocomplete}
        />
        {!isLogin && (
          <span className={classes.message}>(6 characters or more)</span>
        )}

        {isLogin && (
          <div className={classes['radio-inputs']}>
            <div>
              <label htmlFor='dining_hall'>dining hall</label>
              <input
                type='radio'
                name='area'
                value='dining_hall'
                id='dining_hall'
                onClick={radioInputHandler}
              />
            </div>
            <div>
              <label htmlFor='dining_hall'>kitchen</label>
              <input
                onClick={radioInputHandler}
                type='radio'
                name='area'
                value='kitchen'
                id='kitchen'
              />
            </div>
            <div>
              <label htmlFor='dining_hall'>observer</label>
              <input
                onClick={radioInputHandler}
                type='radio'
                name='area'
                value='observer'
                id='observer'
              />
            </div>
          </div>
        )}

        <button type='submit'>{isLogin ? 'Log in' : 'Create account'}</button>
        <span type='button' onClick={toggleFormHandler}>
          {isLogin ? 'create new account' : 'Log in with existing account'}
        </span>
      </form>
    </div>
  );
};

export default AuthForm;
