import { AuthorSimpleModel } from './AuthorSimpleModel';

export interface AudiobookModel {
  id: number;
  name: string;
  description: string;
  authors: AuthorSimpleModel[];
  isForAdults: boolean;
  length: number;
  publishedDate: string;
  isbn: string;
  publishingHouse: string;
  quantity: number;
}
