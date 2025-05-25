import { inject, Injectable, Signal } from "@angular/core";
import { BookCart } from "../interfaces/Book";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";
import { signalSlice } from "ngxtension/signal-slice";

interface CartState {
  books: BookCart[];
  loaded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private _storageService = inject(StorageService);

  private initialState: CartState = {
    books: [],
    loaded: false,
  };

  loadBooks$ = this._storageService
    .loadBooks()
    .pipe(map((books) => ({ books, loaded: true })));

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.loadBooks$],
    selectors: (state) => ({
      count: () =>
        state().books.reduce((acc, book) => acc + book.quantity, 0),
      price: () => {
        return state().books.reduce(
          (acc, book) => acc + book.book.price * book.quantity,
          0,
        );
      },
    }),
    actionSources: {
      add: (state, action$: Observable<BookCart>) =>
        action$.pipe(map((book) => this.add(state, book))),
      remove: (state, action$: Observable<number>) =>
        action$.pipe(map((id) => this.remove(state, id))),
      udpate: (state, action$: Observable<BookCart>) =>
        action$.pipe(map((book) => this.update(state, book))),
      clear: (state, action$: Observable<void>) =>
        action$.pipe(map(() => this.clear(state))),
    },
    effects: (state) => ({
      load: () => {
        if (state().loaded) {
          this._storageService.saveBooks(state().books);
        }
      },
    }),
  });

  private add(state: Signal<CartState>, book: BookCart) {
    const isInCart = state().books.find(
      (bookInCart) => bookInCart.book.id === book.book.id,
    );

    if (!isInCart) {
      return {
        books: [...state().books, { ...book, quantity: 1 }],
      };
    }
    else if (isInCart.quantity < book.book.stock) {
      isInCart.quantity += 1;
    }

    return {
      books: [...state().books],
    };
  }

  private remove(state: Signal<CartState>, id: number) {
    return {
      books: state().books.filter((book) => book.book.id !== id),
    };
  }

  private update(state: Signal<CartState>, book: BookCart) {
    const books = state().books.map((bookInCart) => {
      if (bookInCart.book.id === book.book.id) {
        return { ...bookInCart, quantity: book.quantity };
      }

      return bookInCart;
    });

    return { books };
  }

  private clear(state: Signal<CartState>) {
  this._storageService.clearBooks();
  return {
    books: [],
  };
}

}