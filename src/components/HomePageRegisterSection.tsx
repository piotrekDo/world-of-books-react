import { Link } from 'react-router-dom';
import classes from '../style/HomePageRegisterSection.module.css';

const HomePageRegisterSection = () => {
  return (
    <div id='registerSection' className={classes.main}>
      <h1 data-aos="zoom-out-right" data-aos-duration="1500" data-aos-delay="300" >Why wait?</h1>
      <h3 data-aos="zoom-out-left" data-aos-duration="1500" data-aos-delay="500" >Register today and get access to limitless possibilites</h3>
      <span data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500" className={classes.regiterBtn}><span><span><Link to={'/register'}/></span></span></span>
      <h4 data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="800" >Already here?</h4>
      <span data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="900" className={classes.loginBtn}><span><span><Link to={'/login-page'}/></span></span></span>
    </div>
  );
};
export default HomePageRegisterSection;
