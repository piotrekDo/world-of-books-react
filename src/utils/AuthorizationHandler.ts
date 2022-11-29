import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { UserApi } from '../lib/UserApi';
import { AppContextType } from '../model/AppContextType';
import { LoginModel } from '../model/LoginModel';
import { UserTokenModel } from '../model/UserTokenModel';

let logOutTimer : any;

export const logOuthandler = (context: AppContextType) => {
  context.userModifier(null);
  localStorage.removeItem('userData');
  if(logOutTimer){
    clearTimeout(logOutTimer);
  }
};

export const logInHandler = async (
  context: AppContextType,
  userCredentials: LoginModel,
  setError: (userData: any) => void
) => {
  const userData: any = await UserApi.logIn(userCredentials);
  console.log(userData);
  if (userData.code) {
    setError(userData.response.data.details);
    console.log(userData.response.data.details);
    return;
  }
  const appUser: UserTokenModel = {
    accessToken: userData.data.accessToken,
    accessTokenExpiresAt: userData.data.accessTokenExpiresAt,
    adult: userData.data.adult,
    roles: userData.data.roles,
    username: userData.data.username,
  };
  context.userModifier(appUser);
  localStorage.setItem('userData', JSON.stringify(appUser));
  const reminingTime = calculateRemainigTime(appUser.accessTokenExpiresAt);
  logOutTimer = setTimeout(() => {
    logOuthandler(context);
  }, reminingTime);
};

const calculateRemainigTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const tokenExpirationTime = new Date(expirationTime).getTime();
  const reminingDuration = tokenExpirationTime - currentTime;
  return reminingDuration;
};
