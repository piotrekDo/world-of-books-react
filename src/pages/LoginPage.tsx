import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { UserApi } from "../lib/UserApi";
import { UserTokenModel } from "../model/UserTokenModel";
import classes from '../style/LoginPage.module.css'

const LoginPage = () => {
    const data = useActionData();
    console.log('USER ACTION DATAAA')
    console.log(data)
    const navigation = useNavigation();
    console.log(navigation.state);
    const navigate = useNavigate();
  
    function cancelHandler() {
      navigate('/');
    }
  
    return (
      <div className={classes.main}>
        <div className={`${classes.content} ${classes.form}`}>
          <Form action="/login-page" method="post">
            <div className={classes.title}>Welcome back</div>
            <div className={classes.subtitle}>Log in to your account</div>
            <div className={`${classes.inputcontainer} ${classes.ic1}`}>
              <input
                id="username"
                name="username"
                className={classes.input}
                type="text"
                placeholder=" "
              />
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
                type="text"
                placeholder=" "
              />
              <div className={classes.cut}></div>
              <label htmlFor="password" className={classes.placeholder}>
                Password
              </label>
            </div>
            {navigation.state !== 'submitting' && (
              <button className={classes.submit}>Log in</button>
            )}
            {navigation.state === 'submitting' && (
              <div style={{ marginTop: '30px' }}>Almost there</div>
            )}
          </Form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;

  export async function action({ request }: any) {
    await sleep(2000);
    const formData = await request.formData();
    const response : any = await UserApi.logIn(formData);
    if (response.code) {
        console.log('errorrrrrrrrrrrrrrrrrr')
      console.log(response.code)
      console.log(response.message)
      console.log(response.response.data)
    }else{
        const userData: UserTokenModel = {...response.data}
        console.log('USER DATA')
        console.log(userData);
    }

  }
  
  function sleep(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, time);
    });
  }