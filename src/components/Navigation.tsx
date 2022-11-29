import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOuthandler } from '../utils/AuthorizationHandler'
import AppContext from '../context/AppContext';
import classes from '../style/Header.module.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const isUserLogged = !!context.currentUser?.accessToken;

  const onLogoutHandler = () => {
    logOuthandler(context);
    return navigate('/');
  }

  return (
    <nav className={classes.headerSection}>
      <header className={classes.header}>
        <h1>World of books</h1>
        {!isUserLogged && (
          <ul>
            <li>
              <Link to={'/register'}>
                <span className={classes.button}>
                  <a></a>
                </span>
              </Link>
            </li>
            <li>
              <Link to={'/login-page'}>
                <span className={`${classes.button} ${classes.buttonLogin}`}>
                  <a></a>
                </span>
              </Link>
            </li>
          </ul>
        )}
        {isUserLogged && (
          <ul>
            <li>{context.currentUser?.username}</li>
            <li onClick={onLogoutHandler}>Logout</li>
          </ul>
        )}
      </header>
    </nav>
  );
};

export default Navigation;
