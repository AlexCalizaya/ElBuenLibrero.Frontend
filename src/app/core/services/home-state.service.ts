import { inject, Injectable } from "@angular/core";
import { HomeState } from "../interfaces/HomeState";
import { signalSlice } from 'ngxtension/signal-slice';
import { BookService } from "./book.service";
import { map } from "rxjs";
import { Book } from "../interfaces/Book";

@Injectable()
export class HomeStateService {
    private bookService = inject(BookService);
    
    private initialState: HomeState = {
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