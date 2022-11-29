import axios from 'axios';
import { AppUserModel } from '../model/AppUserModel';
import { CreateNewUserModel } from '../model/CreateNewUserModel';

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
      console.log(user)
      return await axios.post<AppUserModel>(LOCALHOST_DOMAIN + '/users', user);
    } catch (error) {
      return error;
    }
  };
}
