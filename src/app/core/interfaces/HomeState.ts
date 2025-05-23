import { Book } from "./Book";

export interface HomeState {
    books: Book[];
    status: 'loading' | 'success' | 'error';
}