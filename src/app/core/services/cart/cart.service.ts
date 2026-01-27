import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICartItem, ICartResponse } from '../../../model/interface/cart';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = environment.apiUrl;
  cartSubject = new BehaviorSubject<ICartResponse | null>(null);
  cartCount = new BehaviorSubject<number | 0>(0);
  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(productId: string, selectedSize: string) {
    return this.http
      .post(`${this.url}/user/cart/${productId}`, { size: selectedSize }, { withCredentials: true })
      .pipe(
        switchMap(() =>
          this.http.get<ICartResponse>(`${this.url}/user/cart`, { withCredentials: true }),
        ),
        tap((cart: ICartResponse) => {
          this.cartSubject.next(cart);
          this.cartCount.next(cart.items.length);
        }), // ✅ tap updates cart count
      );
  }

  getCart() {
    return this.http.get<ICartResponse>(`${this.url}/user/cart`, { withCredentials: true }).pipe(
      tap((res) => {
        this.cartSubject.next(res);
        this.cartCount.next(res.items.length);
      }),
    );
  }

  updateCart(quantity: number, id: string) {
    return this.http.put<ICartResponse>(
      `${this.url}/user/cart/${id}`,
      { quantity },
      { withCredentials: true },
    );
  }

  removeCartItem(id: string) {
    return this.http.delete<ICartResponse>(`${this.url}/user/cart/${id}`, {
      withCredentials: true,
    });
  }
}
