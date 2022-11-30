import axios from 'axios';
import { AppUserModel } from '../model/AppUserModel';
import { PageModel } from '../model/PageModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class UserManagerApi {
  static getAllUsers = async () => {
    try {
      return await axios.get<PageModel<AppUserModel>>(LOCALHOST_DOMAIN + '/users/all');
    } catch (error) {
      return error;
    }
  };

}
