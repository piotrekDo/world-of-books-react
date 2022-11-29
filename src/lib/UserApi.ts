import axios from 'axios';
import { AppUserModel } from '../model/AppUserModel';
import { CreateNewUserModel } from '../model/CreateNewUserModel';
import { LoginModel } from '../model/LoginModel';
import { UserTokenModel } from '../model/UserTokenModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class UserApi {
  static registerNewUser = async (data: any) => {

    try {
      const user = {
        username: data.get('username'),
        password: data.get('password'),
        userEmail: data.get('email'),
        pesel: data.get('pesel')
      };
      return await axios.post<AppUserModel>(LOCALHOST_DOMAIN + '/users', user);
    } catch (error) {
      return error;
    }
  };

  static logIn = async (data: LoginModel) => {
    console.log('LOGIN AXIOS')
    try {
      return await axios.post<UserTokenModel>(LOCALHOST_DOMAIN + '/login', data);
    } catch (error) {
      return error;
    }
  }
}
