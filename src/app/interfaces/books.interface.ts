export interface IBooks {
    title: string;
    author: string;
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "FANTASY" | "BIOGRAPHY";
    isbn: string;
    description?: string;
    copies: number;
    available: boolean | true;

}