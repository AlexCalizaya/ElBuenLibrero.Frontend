import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStateService } from '../../../core/services/book-state.service';
import { CartStateService } from '../../../core/services/cart-state.service';
import { Book } from '../../../core/interfaces/Book';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [],
  templateUrl: './book-page.component.html',
  providers: [BookStateService],
})
export class BookPageComponent {
  @Input() id!: number;

  cartState = inject(CartStateService).state;
  bookState = inject(BookStateService).state;

  ngOnInit() {
    this.bookState.getById(this.id);
  }

  addToCart() {
    this.cartState.add({
      book: this.bookState.book()!,
      quantity: 1,
    });
  }
}
