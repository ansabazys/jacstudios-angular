import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Hero } from './hero/hero';
import { Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product/product.service';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Hero, CommonModule, Navbar, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private router = inject(Router);

  private productSub!: Subscription;

  productsData$ = this.productService.productsData$;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productSub = this.productService.getProducts().subscribe();
  }

  goToStore(productId: string) {
    this.router.navigate(['/store/product', productId]);
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
