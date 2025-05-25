import { Component, inject } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { HomeStateService } from '../../../core/services/home-state.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CartStateService } from '../../../core/services/cart-state.service';
import { Book } from '../../../core/interfaces/Book';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
  providers: [],
})
export class HomePageComponent {
  cartState = inject(CartStateService).state;
  bookState = inject(HomeStateService);

  addToCart(book: Book) {
    this.cartState.add({
      book,
      quantity: 1,
    });
  }
}
