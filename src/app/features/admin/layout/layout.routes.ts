import { Routes } from '@angular/router';
import { Layout } from './layout';
import { Dashboard } from '../dashboard/dashboard';
import { Products } from '../products/products';
import { Categories } from '../categories/categories';
import { Orders } from '../orders/orders';
import { Users } from '../users/users';
import { AddEditProduct } from '../products/add-edit-product/add-edit-product';
import { AddEditCategory } from '../categories/add-edit-category/add-edit-category';

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
      { path: 'products/add', component: AddEditProduct },
      { path: 'products/edit/:id', component: AddEditProduct },
      { path: 'categories/add', component: AddEditCategory },
      { path: 'categories/edit/:id', component: AddEditCategory },
    ],
  },
];
