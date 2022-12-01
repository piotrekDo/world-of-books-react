import axios, { AxiosResponse } from 'axios';
import { AddNewScientificPaperModel } from '../model/AddNewScientificPaperModel';
import { PageModel } from '../model/PageModel';
import { ScientificPaperModel } from '../model/ScientificPaperModel';

const LOCALHOST_DOMAIN = 'http://localhost:8080';

export class ScientificPaperApi {
  static getNewestScientificPapers = async () => {
    return await axios.get<PageModel<ScientificPaperApi[]>>(
      LOCALHOST_DOMAIN + '/papers?page=0&size=5&sortBy=id'
    );
  };

  static getScientificPaper = async (id: number) => {
    return await axios.get<ScientificPaperModel>(
      LOCALHOST_DOMAIN + `/papers/${id}`
    );
  };

  static getAllScientificPapers = async () => {
    try {
      return await axios.get<PageModel<ScientificPaperApi[]>>(
        LOCALHOST_DOMAIN + '/papers'
      );
    } catch (error) {
      return error;
    }
  };

  static addNewScientificPaper = async (paper: AddNewScientificPaperModel) => {
    try {
      return await axios.post<ScientificPaperModel>(
        LOCALHOST_DOMAIN + '/papers',
        paper
      );
    } catch (error) {
      return error;
    }
  };
}
