import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/cart-page/cart-page.component').then(m => m.CartPageComponent)
  },
] as Routes;
