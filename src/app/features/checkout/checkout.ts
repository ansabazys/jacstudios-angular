import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cart$ = this.cartService.cart$;
  user$ = this.authService.user$;

  address = {
    fullName: '',
    phoneNumber: 0,
    city: '',
    state: '',
    postalCode: '',
    addressLine: '',
  };

  ngOnInit(): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user?.address) {
        this.address = { ...user.address };
      }
    });
  }

  onChange(field: string, value: string) {
    this.address = {
      ...this.address,
      [field]: value,
    };
  }

  placeOrder() {
    this.orderService.createOrder(this.address, 'Cash on Delivery').subscribe({
      next: (res) => {
        console.log(res)
        // this.cartService.clearCart();
        this.router.navigate(['/orders/confirm']);
      },
    });
  }
}
