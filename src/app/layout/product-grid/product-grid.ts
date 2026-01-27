import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { IProduct, IProductApiResponse } from '../../model/interface/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.css'],
  imports: [CommonModule]
})
export class ProductGrid implements OnInit, OnChanges {
  @Input() products: IProduct[] = [];
  @Output() updateProducts = new EventEmitter<any[]>();

  categoryId: string | null = null;
  currentPage: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    // private categoryService: CategoryService,
    // private pageService: PageService
  ) {}

  ngOnInit(): void {
    // Subscribe to route params
    // this.route.paramMap.subscribe(params => {
    //   this.categoryId = params.get('id');
    //   this.fetchProducts();
    // });

    // Subscribe to current page changes
    // this.pageService.currentPage$.subscribe(page => {
    //   this.currentPage = page;
    //   this.fetchProducts();
    // });

    this.fetchProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      // Optionally react when products change from parent
    }
  }

  // async fetchProducts() {
  //   let response;
  //   if (this.categoryId) {
  //     // response = await this.categoryService.getCategoryProducts(this.categoryId).toPromise();
  //   } else {
  //     response = this.productService.getProducts().subscribe()
  //     console.log(response)
  //   }

  //   if (response && response.products) {
  //     this.updateProducts.emit(response.products);
  //     // this.pageService.setTotalPages(response.totalPages);
  //   }
  // }

  fetchProducts() {
    this.productService.getProducts().subscribe((res: IProductApiResponse) => {
      this.updateProducts.emit(res.products);
      console.log(res.products)
    });
  }

  goToProduct(productId: string) {
    this.router.navigate(['/store/product', productId]);
  }
}
