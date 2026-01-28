import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { adminGuard } from './core/guards/admin/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'store',
    loadChildren: () => import('./features/store/store.routes').then((m) => m.storeRoutes),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/layout/layout.routes').then((m) => m.layoutRoutes),
  },
  //   {
  //     path: 'cart',
  //     canActivate: [authGuard],
  //     loadComponent: () =>
  //       import('./features/orders/orders.component').then((c) => c.OrdersComponent),
  //   },
];
