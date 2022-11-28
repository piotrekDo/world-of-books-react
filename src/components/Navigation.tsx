import classes from '../style/Header.module.css';
import book from '../assets/Book.jpg';

const Navigation: React.FC = () => {
  return (
    <nav className={classes.headerSection}>
      <header className={classes.header}>
        <h1>World of books</h1>
      </header>
    </nav>
  );
};

export default Navigation;
