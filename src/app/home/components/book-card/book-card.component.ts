import { Component, Input } from '@angular/core';
import { Book } from '../../../core/interfaces/Book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styles: ``
})
export class BookCardComponent {
  @Input() book!: Book;
}
