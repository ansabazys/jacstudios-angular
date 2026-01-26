import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
//   {
//     path: 'cart',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import('./features/orders/orders.component').then((c) => c.OrdersComponent),
//   },
];
