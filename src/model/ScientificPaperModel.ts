import { AuthorSimpleModel } from "./AuthorSimpleModel";

export interface ScientificPaperModel {
    id: number,
    name: string,
    description: string,
    authors: AuthorSimpleModel[],
    field: string,
    university: string,
    pages: string,
    publishedDate: string,
    quantity: number,
    forAdults: boolean
}