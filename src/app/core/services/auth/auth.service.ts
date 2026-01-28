import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
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
      tap((user) => this.userSubject.next(user)),
      catchError((err) => {
        if (err.status === 401) {
          this.userSubject.next(null);
          return of(null); // 👈 important
        }
        throw err;
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

  loginAdmin(email: string, password: string) {
    return this.http
      .post(`${this.url}/admin/login`, { email, password }, { withCredentials: true })
      .pipe(
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

  logout() {
    return this.http
      .delete(`${this.url}/logout`, { withCredentials: true })
      .pipe(tap(() => this.userSubject.next(null)));
  }
}
