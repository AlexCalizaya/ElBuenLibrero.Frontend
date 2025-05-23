import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseHttpService } from "./base-http.service";
import { Book } from "../interfaces/Book";
import { Observable } from "rxjs";

@Injectable()
export class BookService extends BaseHttpService {

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.apiBookUrl);
    }

    getBook(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.apiBookUrl}/${id}`);
    }
}