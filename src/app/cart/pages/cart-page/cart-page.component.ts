import { Component, inject } from '@angular/core';
import { CartCardComponent } from "../../components/cart-card/cart-card.component";
import { CartStateService } from '../../../core/services/cart-state.service';
import { BookCart } from '../../../core/interfaces/Book';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ClientDataModalComponent } from '../../components/client-data-modal/client-data-modal.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartCardComponent, CurrencyPipe, ClientDataModalComponent, CommonModule],
  templateUrl: './cart-page.component.html',
  styles: ``
})
export class CartPageComponent {
  cartState = inject(CartStateService).state;

  isModalOpen = false;

  onRemove(id: number) {
    this.cartState.remove(id);
  }

  onIncrease(book: BookCart) {
    this.cartState.udpate({
      book: book.book,
      quantity: book.quantity + 1,
    });
  }

  onDecrease(book: BookCart) {
    this.cartState.udpate({
      ...book,
      quantity: book.quantity - 1,
    });
  }

  openFinishModal() {
    this.isModalOpen = true;
  }

  closeFinishModal() {
    this.isModalOpen = false;
  }
}
