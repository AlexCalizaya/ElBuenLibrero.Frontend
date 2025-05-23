import { Component, Input } from '@angular/core';
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
}
