import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookCart } from '../../../core/interfaces/Book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent {
  @Input() bookCartItem!: BookCart;
  @Output() onRemove = new EventEmitter<number>();
  @Output() onIncrease = new EventEmitter<BookCart>();
  @Output() onDecrease = new EventEmitter<BookCart>();

  increaseQuantity(bookCartItem: BookCart) {
    if (bookCartItem.quantity < bookCartItem.book.stock) {
      this.onIncrease.emit(bookCartItem);
    }
  }

  decreaseQuantity(bookCartItem: BookCart) {
    if (bookCartItem.quantity > 1) {
      this.onDecrease.emit(bookCartItem);
    }
  }

}
