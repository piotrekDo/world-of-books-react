import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { UserApi } from '../lib/UserApi';
import classes from '../style/Register.module.css';

const Register = () => {
  const data = useActionData();
  const navigation = useNavigation();
  console.log(navigation.state);
  const navigate = useNavigate();

  function cancelHandler() {
    navigate('/');
  }

  return (
    <div className={classes.main}>
      <div className={`${classes.content} ${classes.form}`}>
        <Form action="/register" method="post">
          <div className={classes.title}>Welcome</div>
          <div className={classes.subtitle}>Let us create your account</div>
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
          <div className={`${classes.inputcontainer} ${classes.ic2}`}>
            <input
              id="email"
              name="email"
              className={classes.input}
              type="email"
              placeholder=" "
            />
            <div className={`${classes.cut} ${classes['cut-short']}`}></div>
            <label htmlFor="email" className={classes.placeholder}>
              Email address
            </label>
          </div>
          <div className={`${classes.inputcontainer} ${classes.ic2}`}>
            <input
              id="pesel"
              name="pesel"
              className={classes.input}
              type="text"
              placeholder=" "
            />
            <div className={classes.cut}></div>
            <label htmlFor="pesel" className={classes.placeholder}>
              PESEL number
            </label>
          </div>
          {navigation.state !== 'submitting' && (
            <button className={classes.submit}>Create your account</button>
          )}
          {navigation.state === 'submitting' && (
            <div style={{ marginTop: '30px' }}>Almost there</div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Register;

export async function action({ request }: any) {
  await sleep(2000);
  const data = await request.formData();

  const response: any = await UserApi.registerNewUser(data);
  if (response.data) {
    console.log(response)
    return redirect('/login-page');
  }

  return redirect('/');
}

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
