import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product/product.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category/category.service';
import { OrderService } from '../../../core/services/order/order.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  orderService = inject(OrderService);
  userService = inject(UserService);

  products$ = this.productService.products$;
  categories$ = this.categoryService.categories$;
  orders$ = this.orderService.orders$;
  orderData$ = this.orderService.orderData$;
  users$ = this.userService.users$;
}
