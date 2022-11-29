import { Link } from 'react-router-dom';
import classes from '../style/HomePageRegisterSection.module.css';

const HomePageRegisterSection = () => {
  return (
    <div id='registerSection' className={classes.main}>
      <h1>Why wait?</h1>
      <h3>Register today and get access to limitless possibilites</h3>
      <span className={classes.regiterBtn}><span><span><Link to={'/register'}/></span></span></span>
      <h4>Already here?</h4>
      <span className={classes.loginBtn}><span><span><Link to={'/login-page'}/></span></span></span>
    </div>
  );
};
export default HomePageRegisterSection;
