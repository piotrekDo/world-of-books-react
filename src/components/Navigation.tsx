import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logOuthandler } from '../utils/AuthorizationHandler';
import AppContext from '../context/AppContext';
import classes from '../style/Header.module.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const isAdmin =
    context.currentUser?.roles === undefined
      ? false
      : context.currentUser?.roles.indexOf('admin') > -1;
  const isUserLogged = !!context.currentUser?.accessToken;

  const onLogoutHandler = () => {
    logOuthandler(context);
    return navigate('/');
  };

  const navLinkClasses = classes.navLink;
  const navLinkClassesActive = `${classes.navLink} ${classes.navLinkActive}`;

  const headerClasses = classes.header;
  const headerClassesAdmin = `${classes.header} ${classes['header__admin']}`;

  return (
    <nav>
      <header className={isAdmin ? headerClassesAdmin : headerClasses}>
        <h1>World of books {isAdmin && '-AdminMode'}</h1>
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
            {isAdmin && (
              <li>
                <NavLink
                  to={'/users-manager'}
                  className={(navData) =>
                    navData.isActive ? navLinkClassesActive : navLinkClasses
                  }
                >
                  Manage users
                </NavLink>
              </li>
            )}
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
