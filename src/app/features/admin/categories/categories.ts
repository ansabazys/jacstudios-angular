import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [AsyncPipe, CommonModule, RouterModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoryService = inject(CategoryService);
  categoriesData$ = this.categoryService.categoriesData$;

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(console.log);
  }
}
