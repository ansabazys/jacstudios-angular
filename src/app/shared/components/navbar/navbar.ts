import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICartResponse } from '../../../model/interface/cart';
import { ProductSearch } from "../../../features/store/product-search/product-search";

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, ProductSearch],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  user$ = this.authService.user$;
  cart$ = this.cartService.cartCount$;

  showSearch = signal(false);

  logOut() {
    this.authService.logout().subscribe((res) => {
      console.log(res);
    });
  }

  toggleSearch() {
    this.showSearch.update((prev) => !prev);
  }
}
