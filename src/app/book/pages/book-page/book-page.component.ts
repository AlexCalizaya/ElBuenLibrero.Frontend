import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStateService } from '../../../core/services/book-state.service';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [],
  templateUrl: './book-page.component.html',
  providers: [BookStateService],
})
export class BookPageComponent {
  @Input() id!: number;

  bookState = inject(BookStateService).state;

  ngOnInit() {
    this.bookState.getById(this.id);
  }
}
