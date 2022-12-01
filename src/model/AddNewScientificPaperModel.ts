import { AuthorSimpleModel } from './AuthorSimpleModel';

export interface AddNewScientificPaperModel {
  authors: AuthorSimpleModel[];
  description: string;
  field: string;
  forAdults: boolean;
  name: string;
  pages: number;
  publishedDate: string;
  university: string;
}
