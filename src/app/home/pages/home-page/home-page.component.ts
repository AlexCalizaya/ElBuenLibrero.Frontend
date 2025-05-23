import { Component, inject } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { HomeStateService } from '../../../core/services/home-state.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
  providers: [BookService, HomeStateService],
})
export class HomePageComponent {
  bookState = inject(HomeStateService);
}
