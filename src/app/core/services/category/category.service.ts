import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ICategoryResponse } from '../../../model/interface/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ICategoryResponse>(`${this.url}/categories`, { withCredentials: true });
  }
}
