import { Component, inject } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orderService = inject(OrderService);

  orderData$ = this.orderService.orderData$;
}
