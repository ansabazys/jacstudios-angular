import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { IProduct, IProductApiResponse } from '../../model/interface/products';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.css'],
  imports: [CommonModule, AsyncPipe],
})
export class ProductGrid {

  productService = inject(ProductService)
  products$ = this.productService.productsData$


  constructor(private router: Router) {}

  goToProduct(productId: string) {
    this.router.navigate(['/store/product', productId]);
  }
}
