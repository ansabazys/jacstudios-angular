import { Component, inject, OnInit, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { ProductGrid } from '../../layout/product-grid/product-grid';
import { Filterbar } from '../../layout/filterbar/filterbar';
import { IProduct, IProductApiResponse } from '../../model/interface/products';
import { Navbar } from '../../shared/components/navbar/navbar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { ICategoryProducts } from '../../model/interface/category';

@Component({
  selector: 'app-store',
  imports: [Sidebar, ProductGrid, Filterbar, Navbar],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store implements OnInit {
  productService = inject(ProductService);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');

  

      if (categoryId) {
        this.productService.getCategoryProducts(categoryId).subscribe();
      } else {
        this.productService.getProducts().subscribe();
      }
    });
  }
}
