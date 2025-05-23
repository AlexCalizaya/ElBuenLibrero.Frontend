import { Book } from "./Book";

export interface BookState {
    book: Book | null;
    status: 'loading' | 'success' | 'error';
}