import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logOuthandler } from '../utils/AuthorizationHandler';
import AppContext from '../context/AppContext';
import classes from '../style/Header.module.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const isUserLogged = !!context.currentUser?.accessToken;

  const onLogoutHandler = () => {
    logOuthandler(context);
    return navigate('/');
  };

  const navLinkClasses = classes.navLink;
  const navLinkClassesActive = `${classes.navLink} ${classes.navLinkActive}`;

  return (
    <nav className={classes.headerSection}>
      <header className={classes.header}>
        <h1>World of books</h1>
        {isUserLogged && (
          <ul className={classes.navLinks}>
            <NavLink
              className={(navData) =>
                navData.isActive ? navLinkClassesActive : navLinkClasses
              }
              to="/"
            >
              What's new
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive ? navLinkClassesActive : navLinkClasses
              }
              to="/publications"
            >
              Publications
            </NavLink>
            <NavLink
              className={(navData) =>
                navData.isActive ? navLinkClassesActive : navLinkClasses
              }
              to="/lol"
            >
              Anuther dummy Link
            </NavLink>
          </ul>
        )}
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
            <li>
              <NavLink
                to={'/user'}
                className={(navData) =>
                  navData.isActive ? navLinkClassesActive : navLinkClasses
                }
              >
                {context.currentUser?.username}
              </NavLink>
            </li>
            <li onClick={onLogoutHandler} className={classes.logout}>
              Logout
            </li>
          </ul>
        )}
      </header>
    </nav>
  );
};

export default Navigation;
