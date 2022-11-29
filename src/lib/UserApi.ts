import axios from 'axios';
import { AppUserModel } from '../model/AppUserModel';
import { CreateNewUserModel } from '../model/CreateNewUserModel';
import { UserTokenModel } from '../model/UserTokenModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class UserApi {
  static registerNewUser = async (data: any) => {
    console.log('REGISTER AXIOS')

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

  static logIn = async (data: any) => {
    console.log('LOGIN AXIOS')
    try {
      const user = {
        username: data.get('username'),
        userPassword: data.get('password')
      };
      return await axios.post<UserTokenModel>(LOCALHOST_DOMAIN + '/login', user);
    } catch (error) {
      return error;
    }
  }
}
