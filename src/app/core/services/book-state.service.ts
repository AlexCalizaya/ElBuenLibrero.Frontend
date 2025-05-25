import { inject, Injectable } from "@angular/core";
import { BookService } from "./book.service";
import { BookState } from "../interfaces/BookState";
import { signalSlice } from "ngxtension/signal-slice";
import { map, Observable, switchMap } from "rxjs";
@Injectable()
export class BookStateService {
  private bookService = inject(BookService);

  private initialState: BookState = {
    book: null,
    status: 'loading' as const,
  };

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      getById: (_state, $: Observable<number>) =>
        $.pipe(
          switchMap((id) => this.bookService.getBookById(id)),
          map((data) => ({ book: data, status: 'success' as const })),
        ),
    },
  });
}