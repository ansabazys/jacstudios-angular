import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';

import { filter, Observable } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ICartItem, ICartResponse } from '../../model/interface/cart';
import { CommonModule } from '@angular/common';
import { CartItem } from './cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CartItem],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  cart$!: Observable<ICartResponse>; // reactive cart
  user$ = this.authService.user$; // logged in user

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$.pipe(
      filter((c): c is ICartResponse => c !== null), // only pass non-null
    );
    this.cartService.getCart().subscribe(res=> console.log(res)); // fetch cart from API on init

  }

  proceedToCheckout(cartItems: ICartItem[]) {
    if (cartItems.length > 0) {
      this.router.navigate(['/store/checkout']);
    }
  }
}
