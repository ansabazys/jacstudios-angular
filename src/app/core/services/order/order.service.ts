import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUserAddress } from '../../../model/interface/user';

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
}
