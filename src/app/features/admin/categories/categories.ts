import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoryService = inject(CategoryService);
  categoriesData$ = this.categoryService.categoriesData$;

}
