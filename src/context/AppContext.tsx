import React, { createContext, useState } from 'react';
import { AppContextType } from '../model/AppContextType';
import { UserTokenModel } from '../model/UserTokenModel';

const defaultSettings: AppContextType = {
  currentUser: null,
  userModifier: (user: UserTokenModel | null) => {},
};

export const AppContext = createContext<AppContextType>(defaultSettings);

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<UserTokenModel | null>(null);

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