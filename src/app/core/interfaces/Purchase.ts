import { BookCart } from "./Book";
import { Client } from "./Client";

export interface Purchase {
    bookList: BookCart[];
    client: Client;
    paymentMethod: string;
    voucher: string;
}