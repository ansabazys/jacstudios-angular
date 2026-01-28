import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { OrderService } from '../../../core/services/order/order.service';
import { UserService } from '../../../core/services/user/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  orderService = inject(OrderService);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit(): void {
    this.productService.getProducts().subscribe(); // triggers the fetch
    this.categoryService.getCategories().subscribe();
    this.orderService.getAdminOrders().subscribe((res) => console.log(res));
    this.userService.getUsers().subscribe();
  }

  logOut() {
    this.authService.logout().subscribe({next: (res) => {
      this.router.navigate(['/store/admin/login'])
    }})
  }
}
