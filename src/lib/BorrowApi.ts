import axios from "axios";
import { BorrowModel } from "../model/BorrowModel";

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class BorrowApi {
    static getCurrentlyBorrowedPublicationsByUser = async (username: string) => {
      return await axios.get<BorrowModel[]>(LOCALHOST_DOMAIN + `/borrow/currently-borrowed-by/${username}`);
    };
  
  }