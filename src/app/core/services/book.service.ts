import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseHttpService } from "./base-http.service";
import { Book } from "../interfaces/Book";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseHttpService {

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiBookUrl);
    }

    getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiBookUrl}/getById`, {
        params: { id: id }
    });
    }

}