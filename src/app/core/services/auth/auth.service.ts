import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { IUser } from '../../../model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkAuth() {
    return this.http.get<IUser>(`${this.url}/me`, { withCredentials: true }).pipe(
      tap({
        next: (user) => this.userSubject.next(user),
        error: () => this.userSubject.next(null),
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }, { withCredentials: true }).pipe(
      switchMap(() => this.http.get<IUser>(`${this.url}/me`, { withCredentials: true })),
      tap((user) => this.userSubject.next(user)),
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(
      `${this.url}/register`,
      { name, email, password },
      { withCredentials: true },
    );
  }
}
