import { Component, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../model/interface/products';
import { ProductService } from '../../../core/services/product/product.service';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch implements OnInit {
  query = new FormControl('');
  @Input() showSearch!: Signal<boolean>;
  @Output() close = new EventEmitter<void>();
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.query.valueChanges
      .pipe(
        debounceTime(400),
        filter((q): q is string => q !== null),
        switchMap((query: string) => this.productService.searchProducts(query)),
      )
      .subscribe({ next: (res) => (this.products = res), error: (err) => console.error(err) });
  }

  closeSearch() {
    this.close.emit();
  }

  goToProduct(id: string) {
    this.router.navigate(['/store/product', id]);
    this.closeSearch();
  }
}
