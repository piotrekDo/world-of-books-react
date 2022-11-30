import { AuthorSimpleModel } from './AuthorSimpleModel';

export interface BorrowModel {
  id: number;
  publicationId: number;
  publicationName: string;
  publicationAuthors: AuthorSimpleModel[];
  publicationType: string;
  userId: number;
  userName: string;
  userEmail: string;
  borrowDate: string;
  requiredReturnDate: string;
}
