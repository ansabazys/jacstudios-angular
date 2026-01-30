import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../../core/services/category/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICategory } from '../../../../model/interface/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-category',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-edit-category.html',
  styleUrl: './add-edit-category.css',
})
export class AddEditCategory implements OnInit {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditing = false;
  currentCategory = signal<ICategory>({title: ''})

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.categoryService.getCategoryById(id).subscribe({
        next: (category) => {
          if (category) {
            this.isEditing = true;
            this.currentCategory.set(category)
            console.log(this.currentCategory())
          } else {
            this.router.navigate(['/admin/categories']);
          }
        },
        error: () => {
          this.router.navigate(['/admin/categories']);
        },
      });
    }
  }

  saveCategory() {
    if (this.isEditing) {
      // this.categoryService.updateCategory(this.currentCategory);
    } else {
      this.categoryService.addCategory(this.currentCategory().title).subscribe(console.log);
    }
    this.router.navigate(['/admin/categories']);
  }
}
