import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ICategory, ICategoryResponse } from '../../../model/interface/category';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<ICategoryResponse | null>(null);
  categories$ = this.categorySubject.asObservable();

  private categoryDataSubject = new BehaviorSubject<ICategory[] | []>([]);
  categoriesData$ = this.categoryDataSubject.asObservable();
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    if (this.categorySubject.value) {
      return of(this.categorySubject.value); // cached value
    }

    return this.http
      .get<ICategoryResponse>(`${this.url}/categories`, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.categorySubject.next(res);
          this.categoryDataSubject.next(res.category);
        }),
      );
  }
}
