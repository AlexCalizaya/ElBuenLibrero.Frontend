import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../core/interfaces/Book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styles: ``
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() addToCart = new EventEmitter<Book>();

  add(event: Event) {
    this.addToCart.emit(this.book);
  }
}
