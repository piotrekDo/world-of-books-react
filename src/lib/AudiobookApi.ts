import axios from "axios";
import { AudiobookModel } from "../model/AudiobookModel";

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class AudiobookApi {
    static getNewestAudiobooks = async () => {
      return await axios.get<AudiobookModel[]>(LOCALHOST_DOMAIN + '/audiobooks/newest');
    };
  
    static getAudiobook = async (id: number) => {
      return await axios.get<AudiobookModel>(LOCALHOST_DOMAIN + `/audiobook/${id}`);
    }

    static getAllAudiobooks = async () => {
      try {
        return await axios.get<AudiobookModel[]>(LOCALHOST_DOMAIN + '/audiobooks');
      }catch(error) {
        return error;
      }
    }
  }