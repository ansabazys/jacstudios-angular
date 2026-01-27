// src/app/pages/store/product-details/product-details.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../model/interface/products';
import { ProductService } from '../../../core/services/product/product.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetails implements OnInit {
  // product: IProduct | null = null;
  product = signal<IProduct | null>(null)
  selectedSize: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res)
        this.product.set(res)
        const outOfStock = this.product()?.sizes.every((s) => s.stock === 0);
        console.log(outOfStock)
        if (outOfStock) this.error = 'Out of stock';
      },
      error: (err) => console.error(err),
    });
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.error = '';

  }

  addToCart() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedSize) {
      this.error = 'Please select a size';
      return;
    }

    if (this.product()) {
      this.cartService.addToCart(this.product()?._id!, this.selectedSize).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => console.error(err),
      });
    }
  }
}
