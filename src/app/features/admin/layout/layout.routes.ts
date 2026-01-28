import { Routes } from '@angular/router';
import { Layout } from './layout';
import { Dashboard } from '../dashboard/dashboard';
import { Products } from '../products/products';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // 👈 default
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
    ],
  },
];
