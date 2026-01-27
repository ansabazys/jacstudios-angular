import { Routes } from '@angular/router';
import { Store } from './store';
import { ProductDetails } from './product-details/product-details';
import { authGuard } from '../../core/guards/auth/auth-guard';

export const storeRoutes: Routes = [
  {
    path: '',
    component: Store,
  },
  { path: 'product/:id', component: ProductDetails },
  { path: 'cart', canActivate: [authGuard],
    loadComponent: () => import('../cart/cart').then((m) => m.Cart) },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('../checkout/checkout').then((m) => m.Checkout),
  },
];
