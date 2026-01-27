import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { ProductGrid } from '../../layout/product-grid/product-grid';
import { Filterbar } from '../../layout/filterbar/filterbar';

@Component({
  selector: 'app-store',
  imports: [Sidebar, ProductGrid, Filterbar],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store implements OnInit {
  products: any[] = [];

  // Function to update products from child components
  setProducts(products: any[]) {
    this.products = products;
  }

  ngOnInit(): void {
    console.log(this.products);
  }
}
