import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export const AuthenticatedGuard = ({ children }: React.PropsWithChildren) => {
  const context = useContext(AppContext);


  if (!context.currentUser) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedGuard;
