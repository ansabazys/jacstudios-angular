import { Component, inject } from '@angular/core';
import { IProduct } from '../../../model/interface/products';
import { ProductService } from '../../../core/services/product/product.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  productService = inject(ProductService);

  productsData$ = this.productService.productsData$;

  openModal(product?: IProduct) {
    // this.isEditing = !!product;
    // this.currentProduct = product ? { ...product } : this.getEmptyProduct();
    // const modal = document.querySelector('dialog') as HTMLDialogElement;
    // modal.showModal();
  }
}
