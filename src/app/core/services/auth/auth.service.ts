import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }, { withCredentials: true });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(
      `${this.url}/register`,
      { name, email, password },
      { withCredentials: true },
    );
  }
}
