import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductApiResponse } from '../../../model/interface/products';
import { BehaviorSubject, of, tap } from 'rxjs';
import { ICategoryProducts } from '../../../model/interface/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;
  private productSubject = new BehaviorSubject<IProductApiResponse | null>(null);
  products$ = this.productSubject.asObservable();

  private productsDataSubject = new BehaviorSubject<IProduct[] | null>(null);
  productsData$ = this.productsDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    // if (this.productsDataSubject.value) {
    //   return of(this.productsDataSubject.value)
    // }
    return this.http
      .get<IProductApiResponse>(`${this.url}/products`, { withCredentials: true })
      .pipe(
        tap((products) => {
          this.productSubject.next(products);
          this.productsDataSubject.next(products.products);
        }),
      );
  }

  getCategoryProducts(id: string) {
    return this.http
      .get<ICategoryProducts>(`${this.url}/categories/${id}`, { withCredentials: true })
      .pipe(
        tap((products) => {
          this.productsDataSubject.next(products.products);
        }),
      );
  }

  getProductById(productId: string) {
    return this.http.get<IProduct>(`${this.url}/products/${productId}`, { withCredentials: true });
  }

  searchProducts(query: string) {
    return this.http.get<IProduct[]>(`${this.url}/search?q=${query}`);
  }
}
