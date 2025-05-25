import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../services/cart-state.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { HomeStateService } from '../../services/home-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  cartState = inject(CartStateService).state;
  searchForm: FormGroup;
  homeState = inject(HomeStateService).state;

  constructor(
    private fb: FormBuilder, 
    private bookService: BookService) 
    {
      this.searchForm = this.fb.group({
        docType: ['I'],
        searchTerm: ['']
      });
    }

  onEnter() {
    const { docType, searchTerm } = this.searchForm.value;
    if (!searchTerm) return;
    if (docType === 'I') {
      this.homeState.getByISBN(searchTerm)
    } else if (docType === 'N') {
      this.homeState.getByName(searchTerm)
    }
  }
}
