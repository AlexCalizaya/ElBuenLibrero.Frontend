import { Observable } from "rxjs";
import { BaseHttpService } from "./base-http.service";
import { Client } from "../interfaces/Client";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseHttpService {
    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiClientUrl);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiClientUrl}/getById/${id}`);
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.apiClientUrl, client);
    }

    updateClient(client: Client): Observable<Client> {
        return this.http.put<Client>(`${this.apiClientUrl}/${client.id}`, client);
    }

    deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiClientUrl}/${id}`);
    }
}
