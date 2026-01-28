import { Routes } from '@angular/router';
import { Layout } from './layout';
import { Dashboard } from '../dashboard/dashboard';
import { Products } from '../products/products';
import { Categories } from '../categories/categories';
import { Orders } from '../orders/orders';
import { Users } from '../users/users';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 👈 default
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'categories', component: Categories },
      { path: 'orders', component: Orders },
      { path: 'users', component: Users },
    ],
  },
];
