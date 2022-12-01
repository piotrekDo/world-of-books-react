import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export const AdminGuard = ({ children }: React.PropsWithChildren) => {
  const context = useContext(AppContext);
  const isAdmin = !context.currentUser ? false : context.currentUser?.roles.indexOf('admin') > -1;
  console.log(isAdmin)


  if (!isAdmin) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
