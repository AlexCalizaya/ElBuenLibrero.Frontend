import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BookCart } from "../interfaces/Book";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
  
  loadBooks(): Observable<BookCart[]> {
    const rawBooks = localStorage.getItem('books');
    return of(rawBooks ? JSON.parse(rawBooks) : []);
  }

  saveBooks(books: BookCart[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  clearBooks(): void {
    localStorage.removeItem('books');
  }
}