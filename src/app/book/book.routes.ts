import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/book-page/book-page.component').then(m => m.BookPageComponent)
  },
] as Routes;
