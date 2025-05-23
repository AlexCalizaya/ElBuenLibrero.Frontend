import { inject, Injectable } from "@angular/core";
import { State } from "../interfaces/State";
import { signalSlice } from 'ngxtension/signal-slice';
import { BookService } from "./book.service";
import { map } from "rxjs";
import { Book } from "../interfaces/Book";

@Injectable()
export class BookStateService {
    private bookService = inject(BookService);
    
    private initialState: State = {
        books: [],
        status: 'loading' as const,
    };

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.bookService
            .getBooks()
            .pipe(map((books : Book[]) => ({ books, status: 'success' as const })))
        ]  
    });
}