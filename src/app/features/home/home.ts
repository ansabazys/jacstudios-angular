import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Hero } from './hero/hero';
import { ICategory, ICategoryResponse } from '../../model/interface/category';
import { Observable } from 'rxjs';
import { CategoryService } from '../../core/services/category/category.service';
import { CommonModule } from '@angular/common';
import { IProduct, IProductApiResponse } from '../../model/interface/products';
import { ProductService } from '../../core/services/product/product.service';
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, CommonModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  products = signal<IProduct[] | null>(null);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res: IProductApiResponse) => {
      this.products.set(res.products);
    });
  }

  goToStore(productId: string) {
    this.router.navigate(['/store/product', productId]);
  }
}
