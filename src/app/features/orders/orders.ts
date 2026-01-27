import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { IOrderResponse } from '../../model/interface/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
})
export class Orders {
  private orderService = inject(OrderService);
  private router = inject(Router);

  ordersList$: Observable<IOrderResponse[]> = this.orderService.getOrders();

  loading = false;

  cancelOrder(orderId: string) {
    this.orderService
      .updateOrder(orderId, 'canceled')
      .subscribe(() => {
        // Could refresh orders or navigate
        this.ordersList$ = this.orderService.getOrders(); // refresh list
      });
  }
}
