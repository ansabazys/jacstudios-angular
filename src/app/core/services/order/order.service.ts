import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUserAddress } from '../../../model/interface/user';
import { IOrderResponse } from '../../../model/interface/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = environment.apiUrl;
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

  updateOrder(id: string, orderStatus: string) {
    return this.http.put(
      `${this.url}/user/orders/${id}`,
      { orderStatus },
      { withCredentials: true },
    );
  }
}
