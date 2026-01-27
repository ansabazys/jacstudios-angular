import { Component, OnInit, HostListener, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory, ICategoryResponse } from '../../model/interface/category';
// import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  categories = signal<ICategory[] | null>(null);
  isOpen = false;
  width = window.innerWidth;
  currentCategoryId: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.loadCategories();

    this.getCategories();

    // Get current category ID from URL
    this.route.paramMap.subscribe((params) => {
      this.currentCategoryId = params.get('id');
    });
  }

  // async loadCategories() {
  //   const [data, err] = await this.categoryService.getCategories().toPromise();
  //   if (data) this.categories = data.category;
  // }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: ICategoryResponse) => {
      this.categories.set(res.category);
    });
  }

  toggleMenu() {
    if (this.width < 768) {
      this.isOpen = !this.isOpen;
    }
  }

  navigateToCategory(id: string) {
    this.router.navigate(['/category', id]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
  }
}
