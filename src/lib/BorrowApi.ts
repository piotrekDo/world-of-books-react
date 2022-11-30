import axios from 'axios';
import { BorrowModel } from '../model/BorrowModel';
import { BorrowRequestModel } from '../model/BorrowRequestModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class BorrowApi {
  static getCurrentlyBorrowedPublicationsByUser = async (username: string) => {
    try {
      return await axios.get<BorrowModel[]>(
        LOCALHOST_DOMAIN + `/borrow/currently-borrowed-by/${username}`
      );
    } catch (error) {
      return error;
    }
  };

  static getPublicationsBorrowHistoryByUser = async (username: string) => {
    try {
      return await axios.get<BorrowModel[]>(
        LOCALHOST_DOMAIN + `/borrow/by-user/${username}`
      );
    } catch (error) {
      return error;
    }
  };

  static sendBorrowRequest = async (borrowRequest: BorrowRequestModel) => {
    try {
      return await axios.post<BorrowModel>(LOCALHOST_DOMAIN + '/borrow', borrowRequest)
    } catch (error) {
      return error;
    }
  };
}
