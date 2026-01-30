import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ICategory, ICategoryResponse } from '../../../model/interface/category';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';

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
    // if (this.categorySubject.value) {
    //   return of(this.categorySubject.value); // cached value
    // }

    return this.http
      .get<ICategoryResponse>(`${this.url}/categories`, { withCredentials: true })
      .pipe(
        tap((res) => {
          this.categorySubject.next(res);
          this.categoryDataSubject.next(res.category);
        }),
      );
  }

  getCategoryById(cateId: string) {
    return this.http.get<ICategory>(`${this.url}/categories/${cateId}`, {
      withCredentials: true,
    });
  }

  addCategory(title: string) {
    return this.http
      .post(
        `${this.url}/admin/categories`,
        { title },
        {
          withCredentials: true,
        },
      )
      .pipe(switchMap(() => this.getCategories()));
  }

  deleteCategory(id: string) {
    return this.http
      .delete(`${this.url}/admin/categories/${id}`, {
        withCredentials: true,
      })
      .pipe(switchMap(() => this.getCategories()));
  }
}
