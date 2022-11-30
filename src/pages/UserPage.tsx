import { useContext } from 'react';
import CurrentlyBorrowedByUserList from '../components/CurrentlyBorrowedByUserList';
import AppContext from '../context/AppContext';
import classes from '../style/UserPage.module.css';

const UserPage: React.FC = (props) => {
  const context = useContext(AppContext);
  const user = context.currentUser;
  return (
    <section className={classes.main}>
      <h1>{user?.username}</h1>
      <h3>Currently borrowed publications</h3>
      <div>
        <CurrentlyBorrowedByUserList username={user!.username} />
      </div>
    </section>
  );
};

export default UserPage;
