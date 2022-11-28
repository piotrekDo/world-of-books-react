import { Button } from '@chakra-ui/react';
import classes from '../style/HomePageRegisterSection.module.css';

const HomePageRegisterSection = () => {
  return (
    <div className={classes.main}>
      <h1>Why wait?</h1>
      <h3>Register today and get access to limitless possibilites</h3>
      <span className={classes.regiterBtn}><span><a href="#"></a></span></span>
      <h4>Already here?</h4>
      <span className={classes.loginBtn}><span><a href="#"></a></span></span>
    </div>
  );
};
export default HomePageRegisterSection;
