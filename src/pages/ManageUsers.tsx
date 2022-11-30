import { useCallback, useContext, useEffect, useState } from 'react';
import PrimarySpinner from '../components/spinners/PrimarySpinner';
import AppContext from '../context/AppContext';
import { UserManagerApi } from '../lib/UserManagerApi';
import { AppUserModel } from '../model/AppUserModel';
import classes from '../style/ManageUsers.module.css';

const ManageUsers: React.FC = (props) => {
  const context = useContext(AppContext);
  const isAdmin =
    context.currentUser?.roles === undefined
      ? false
      : context.currentUser?.roles.indexOf('admin') > -1;

  const [users, setUsers] = useState<AppUserModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLoading = !users ? true : false;

  const fetchUsers = useCallback(async () => {
    await sleep(2000);
    const data: any = await UserManagerApi.getAllUsers();

    if (data.message) {
      setError(data.message);
      setUsers([]);
    }

    if (data.data) {
      setUsers(data.data.content);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className={classes.main}>
      <h1>User manager works!</h1>
      {isLoading && <PrimarySpinner message='Loading users'/>}
      {!isLoading && (
        <ul>
          {users!.map((user) => (
            <p key={user.id}>{user.username}</p>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ManageUsers;

function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
