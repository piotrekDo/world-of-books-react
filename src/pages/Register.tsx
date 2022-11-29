import { Link } from 'react-router-dom';
import classes from '../style/Register.module.css';

const Register = () => {
  return (
    <div className={classes.main}>
    <div className={`${classes.content} ${classes.form}`}>
      <div className={classes.title}>Welcome</div>
      <div className={classes.subtitle}>Let us create your account</div>
      <div className={`${classes.inputcontainer} ${classes.ic1}`}>
        <input id="firstname" className={classes.input} type="text" placeholder=" " />
        <div className={classes.cut}></div>
        <label htmlFor="firstname" className={classes.placeholder}>First name</label>
      </div>
      <div className={`${classes.inputcontainer} ${classes.ic2}`}>
        <input id="lastname" className={classes.input} type="text" placeholder=" " />
        <div className={classes.cut}></div>
        <label htmlFor="lastname" className={classes.placeholder}>Last name</label>
      </div>
      <div className={`${classes.inputcontainer} ${classes.ic2}`}>
        <input id="email" className={classes.input} type="text" placeholder=" " />
        <div className={`${classes.cut} ${classes['cut-short']}`}></div>
        <label htmlFor="email" className={classes.placeholder}>Email</label>
      </div>
      <button className={classes.submit}>submit</button>
    </div>
    </div>
  );
};

export default Register;
