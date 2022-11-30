import React, { useContext, useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import AppContext from '../context/AppContext';
import useInput from '../hooks/UseInput';
import { UserApi } from '../lib/UserApi';
import { LoginModel } from '../model/LoginModel';
import { UserTokenModel } from '../model/UserTokenModel';
import classes from '../style/LoginPage.module.css';
import { logInHandler } from '../utils/AuthorizationHandler';

const LoginPage = () => {
  const context = useContext(AppContext);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    value: enteredUserName,
    isValid: enteredUserNameIsValid,
    hasError: userNameInputHasError,
    valueChangeHandler: userNameChangedHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPass,
    isValid: enteredPassIsValid,
    hasError: passInputHasError,
    valueChangeHandler: passChangedHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPassInput,
  } = useInput((value) => value.trim() !== '');

  const formIsValid = enteredUserNameIsValid && enteredPassIsValid;
  const isSubmitting = navigation.state === 'submitting';

  const onLoginHandler = async (event: React.FormEvent | any) => {
    setError(null);
    event.preventDefault();
    if (!formIsValid) return;
    const userCredentials: LoginModel = {
      username: enteredUserName,
      userPassword: enteredPass,
    };
    const loginSuccesfull = await logInHandler(context, userCredentials, setError);

    if(loginSuccesfull) {
    resetUserNameInput();
    resetPassInput();
    return navigate('/publications');
    }
  };

  return (
    <div className={classes.main}>
      <div className={`${classes.content} ${classes.form}`}>
        <form>
          <div className={classes.title}>Welcome back</div>
          <div className={classes.subtitle}>Log in to your account</div>
          <div className={`${classes.inputcontainer} ${classes.ic1}`}>
            <input
              className={classes.input}
              id="username"
              name="username"
              type="text"
              placeholder=" "
              onChange={userNameChangedHandler}
              onBlur={userNameBlurHandler}
              value={enteredUserName}
              disabled={isSubmitting}
            />
            {userNameInputHasError && (
              <p className="error-text">Name must not be empty.</p>
            )}

            <div className={classes.cut}></div>
            <label htmlFor="username" className={classes.placeholder}>
              Your username
            </label>
          </div>
          <div className={`${classes.inputcontainer} ${classes.ic2}`}>
            <input
              id="password"
              name="password"
              className={classes.input}
              type="password"
              placeholder=" "
              onChange={passChangedHandler}
              onBlur={passBlurHandler}
              value={enteredPass}
              disabled={isSubmitting}
            />
            {passInputHasError && (
              <p className="error-text">Password must not be empty.</p>
            )}
            <div className={classes.cut}></div>
            <label htmlFor="password" className={classes.placeholder}>
              Password
            </label>
          </div>
          {!formIsValid && (
            <h3 style={{ marginTop: '60px' }}>Please enter your credentials</h3>
          )}
          {!isSubmitting && formIsValid && (
            <button
              type="submit"
              onClick={onLoginHandler}
              className={classes.submit}
            >
              Log in
            </button>
          )}
          {isSubmitting && (
            <div style={{ marginTop: '30px' }}>Almost there</div>
          )}
        </form>
        {error && <h3>{error}</h3>}
      </div>
    </div>
  );
};

export default LoginPage;

//   export async function action({ request }: any) {

//     await sleep(2000);
//     const formData = await request.formData();
//     const response : any = await UserApi.logIn(formData);
//     if (response.code) {
//         console.log('errorrrrrrrrrrrrrrrrrr')
//       console.log(response.code)
//       console.log(response.message)
//       console.log(response.response.data)
//     }else{
//         const userData: UserTokenModel = {...response.data}
//         console.log('USER DATA')
//         console.log(userData);

//     }

//   }

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
