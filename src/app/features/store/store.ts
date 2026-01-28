import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { ProductGrid } from '../../layout/product-grid/product-grid';
import { Filterbar } from '../../layout/filterbar/filterbar';
import { IProduct } from '../../model/interface/products';
import { Navbar } from "../../shared/components/navbar/navbar";

@Component({
  selector: 'app-store',
  imports: [Sidebar, ProductGrid, Filterbar, Navbar],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  products: IProduct[] = [];

  // Function to update products from child components
  setProducts(products: any[]) {
    this.products = products;
  }
}
