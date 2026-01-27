import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Store } from './features/store/store';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'store',
    loadChildren: () => import('./features/store/store.routes').then((m) => m.storeRoutes),
  },
  //   {
  //     path: 'cart',
  //     canActivate: [authGuard],
  //     loadComponent: () =>
  //       import('./features/orders/orders.component').then((c) => c.OrdersComponent),
  //   },
];
