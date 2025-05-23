import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BaseHttpService {
    protected readonly http = inject(HttpClient);

    protected readonly apiBookUrl = `${environment.API_URL}/books/`;
    protected readonly apiClientUrl = `${environment.API_URL}/clients/`;
    protected readonly apiOrderUrl = `${environment.API_URL}/orders/`;
    protected readonly apiDetailUrl = `${environment.API_URL}/details/`;
}