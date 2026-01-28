import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUserAddress } from '../../../model/interface/user';
import { IOrderResponse, IOrdersResponse } from '../../../model/interface/order';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl;
  orderSubject = new BehaviorSubject<IOrdersResponse | null>(null);
  orders$ = this.orderSubject.asObservable();

  private orderDataSubject = new BehaviorSubject<IOrderResponse[]>([]);
  orderData$ = this.orderDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createOrder(address: IUserAddress, paymentMethod: string) {
    return this.http.post(
      `${this.url}/user/orders`,
      { address, paymentMethod },
      { withCredentials: true },
    );
  }

  getOrders() {
    return this.http.get<IOrderResponse[]>(`${this.url}/user/orders`, { withCredentials: true });
  }

  getAdminOrders() {
    if (this.orderSubject.value) {
      return of(this.orderSubject.value);
    }
    return this.http
      .get<IOrdersResponse>(`${this.url}/admin/orders`, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.orderSubject.next(res);
          this.orderDataSubject.next(res.orders);
        }),
      );
  }

  updateOrder(id: string, orderStatus: string) {
    return this.http.put(
      `${this.url}/user/orders/${id}`,
      { orderStatus },
      { withCredentials: true },
    );
  }
}
