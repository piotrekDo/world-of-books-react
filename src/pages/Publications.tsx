import { useContext } from 'react';
import AppContext from '../context/AppContext';
import classes from '../style/Publications.module.css';

const Publications: React.FC = (props) => {
  const context = useContext(AppContext);
  const isAdmin = context.currentUser?.roles === undefined ? false : context.currentUser?.roles.indexOf('admin') > -1;
  return (
    <section className={classes.main}>
      <h1>Publications work!</h1>
      
    </section>
  );
};

export default Publications;
