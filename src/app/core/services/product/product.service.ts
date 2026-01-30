import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductApiResponse } from '../../../model/interface/products';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
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

  searchProducts(query?: string, price?: string) {
    if (price) {
      return this.http.get<IProduct[]>(`${this.url}/search?price=${price}`).pipe(
        tap((products) => {
          this.productsDataSubject.next(products);
        }),
      );
    }
    return this.http.get<IProduct[]>(`${this.url}/search?q=${query}`);
  }

  addProduct(data: FormData) {
    return this.http
      .post(`${this.url}/admin/products`, data, { withCredentials: true })
      .pipe(switchMap(() => this.getProducts()));
  }

  deleteProduct(id: string, catId: string) {
    return this.http
      .delete(`${this.url}/admin/products/${id}/${catId}`, { withCredentials: true })
      .pipe(switchMap(() => this.getProducts()));
  }

  updateProduct(id: string, data: FormData) {
    return this.http
      .put(`${this.url}/admin/products/${id}`, data, { withCredentials: true })
      .pipe(switchMap(() => this.getProducts()));
  }
}
