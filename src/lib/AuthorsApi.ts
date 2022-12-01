import axios from 'axios';
import { AuthorSimpleModel } from '../model/AuthorSimpleModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class AuthorsApi {
  static getAuthors = async () => {
    try {
      return axios.get<AuthorSimpleModel[]>(LOCALHOST_DOMAIN + '/authors');
    } catch (error) {
      return error;
    }
  };
}
