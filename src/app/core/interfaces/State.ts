import { Book } from "./Book";

export interface State {
    books: Book[];
    status: 'loading' | 'success' | 'error';
}