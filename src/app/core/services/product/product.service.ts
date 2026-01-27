import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductApiResponse } from '../../../model/interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProductApiResponse>(`${this.url}/products`, { withCredentials: true });
  }

  getProductById(productId: string) {
    return this.http.get<IProduct>(`${this.url}/products/${productId}`, { withCredentials: true })
  }
}
