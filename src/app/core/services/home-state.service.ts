import { inject, Injectable } from "@angular/core";
import { HomeState } from "../interfaces/HomeState";
import { signalSlice } from 'ngxtension/signal-slice';
import { BookService } from "./book.service";
import { map, Observable, switchMap } from "rxjs";
import { Book } from "../interfaces/Book";

@Injectable({
  providedIn: 'root',
})
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
        ],
        actionSources: {
            getByName: (_state, $: Observable<string>) =>
            $.pipe(
                switchMap((name) => this.bookService.getBookByName(name)),
                map((data) => ({ books: data, status: 'success' as const })),
            ),
            
            getByISBN: (_state, $: Observable<string>) =>
            $.pipe(
                switchMap((isbn) => this.bookService.getBookByISBN(isbn)),
                map((data) => ({ books: data, status: 'success' as const })),
            ),
            getBooks: (_state, $: Observable<void>) =>
            $.pipe(
                switchMap(() => this.bookService.getBooks()),
                map((data) => ({ books: data, status: 'success' as const })),
            ),          
        },  
    });



    updateBooks(books: Book[]) {
    this.state().books = books;
  }
}