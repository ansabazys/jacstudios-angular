import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserApiResponse } from '../../../model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;
  private userSubject = new BehaviorSubject<IUserApiResponse | null>(null);
  users$ = this.userSubject.asObservable();

  private userDataSubject = new BehaviorSubject<IUser[] | []>([]);
  usersData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers() {
    if (this.userSubject.value) {
      return of(this.userSubject.value); // cached value
    }
    return this.http
      .get<IUserApiResponse>(`${this.url}/admin/users`, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.userSubject.next(res);
          this.userDataSubject.next(res.users);
        }),
      );
  }
}
