import { Observable } from "rxjs";
import { Order } from "../interfaces/Order";
import { BaseHttpService } from "./base-http.service";
import { Injectable } from "@angular/core";
import { Purchase } from "../interfaces/Purchase";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseHttpService {
    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiOrderUrl);
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${this.apiOrderUrl}/getById/${id}`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiOrderUrl}/createOrder`, order);
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.apiOrderUrl}/${order.id}`, order);
    }

    deleteOrder(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiOrderUrl}/${id}`);
    }

    finishPurchase(purchase: Purchase): Observable<void> {
        return this.http.post<void>(`${this.apiOrderUrl}/finishPurchase`, purchase);
    }
}