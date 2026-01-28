import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  userService = inject(UserService);

  usersData$ = this.userService.usersData$;
}
