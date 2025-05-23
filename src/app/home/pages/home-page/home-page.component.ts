import { Component, inject } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { BookStateService } from '../../../core/services/book-state.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
  providers: [BookService, BookStateService],
})
export class HomePageComponent {
  bookState = inject(BookStateService);
}
