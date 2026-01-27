import { Component, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICartItem } from '../../../model/interface/cart';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.css'],
})
export class CartItem {
  @Input() item!: ICartItem; // Cart item input from parent
  quantity!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.item.quantity;
  }

  increaseQuantity() {
    const stock =
      this.item.productId.sizes.find((s) => s.size === this.item.selectedSize)?.stock || 0;

    if (this.quantity + 1 <= stock) {
      this.quantity++;
      this.updateCart();
    } else {
      alert( `You cannot add ${this.quantity + 1} items. Only ${stock} in stock.`)
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateCart();
    }
  }

  updateCart() {
    this.cartService
      .updateCart(this.quantity, this.item._id)
      .pipe(
        tap(() => {
          // Optionally refresh cart
          this.cartService.getCart().subscribe({next: (res) => {
            this.cartService.cartSubject.next(res)
          }});
        }),
      )
      .subscribe();
  }

  removeItem() {
    this.cartService.removeCartItem(this.item.productId._id).subscribe(() => {
      this.cartService.getCart().subscribe({next: (res) => {
        this.cartService.cartSubject.next(res)
      }});
      console.log('Item removed from cart.');
    });
  }
}
