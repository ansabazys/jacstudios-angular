import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Hero } from './hero/hero';
import { ICategory, ICategoryResponse } from '../../model/interface/category';
import { Observable } from 'rxjs';
import { CategoryService } from '../../core/services/category/category.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IProduct, IProductApiResponse } from '../../model/interface/products';
import { ProductService } from '../../core/services/product/product.service';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, CommonModule, Navbar, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  productsData$ = this.productService.productsData$;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe();
  }

  goToStore(productId: string) {
    this.router.navigate(['/store/product', productId]);
  }
}
