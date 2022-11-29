import React, { createContext, useState } from 'react';
import { AppContextType } from '../model/AppContextType';
import { UserTokenModel } from '../model/UserTokenModel';

const defaultSettings: AppContextType = {
  currentUser: null,
  userModifier: (user: UserTokenModel | null) => {},
};

export const AppContext = createContext<AppContextType>(defaultSettings);

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const stash = localStorage.getItem('userData');
 const initialState: UserTokenModel | null = stash !== null ?  JSON.parse(stash) : null;

  const [currentUser, setCurrentUser] = useState<UserTokenModel | null>(initialState);

  const userModifier = (user: UserTokenModel | null) => {
    setCurrentUser(user);
  };

  return (
    <AppContext.Provider value={{ currentUser, userModifier }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
