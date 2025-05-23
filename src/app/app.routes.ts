import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes'),
  },
  {
    path: 'book/:id',
    loadChildren: () => import('./book/book.routes'),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes'),
  },
];
