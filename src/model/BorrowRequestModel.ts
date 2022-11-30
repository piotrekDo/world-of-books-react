export interface BorrowRequestModel {
      publicationId : number;
      publicationType: string;
      user: string;
      borrowEnd?: string;
}