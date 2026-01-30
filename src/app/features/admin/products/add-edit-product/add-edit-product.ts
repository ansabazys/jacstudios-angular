import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../core/services/category/category.service';
import { ProductService } from '../../../../core/services/product/product.service';
import { IProduct } from '../../../../model/interface/products';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-edit-product.html',
  styleUrl: './add-edit-product.css',
})
export class AddEditProduct {
  private categoryService = inject(CategoryService);
  private productsService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories$ = this.categoryService.categoriesData$;
  isEditing = false;
  currentProduct: IProduct = this.getEmptyProduct();
  imagePreview = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productsService.getProductById(id).subscribe({
        next: (product) => {
          if (product) {
            this.isEditing = true;
            this.currentProduct = product;

            // Set preview for existing image
            if (product.images && product.images.length > 0) {
              this.imagePreview.set(product.images[0]);
            }
          } else {
            this.router.navigate(['/admin/products']);
          }
        },
        error: () => {
          this.router.navigate(['/admin/products']);
        },
      });
    } else {
      // For new product, also set default preview
      this.imagePreview.set(this.currentProduct.images[0]);
    }
  }

  getEmptyProduct(): IProduct {
    return {
      title: '',
      description: '',
      categoryId: '',
      price: 0,
      stockStatus: 'out of stock',
      sizes: [],
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
      ],
    };
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    console.log(file);

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);

      // Store preview or file reference
      this.currentProduct.imageFile = file;
    };
    reader.readAsDataURL(file);
  }

  saveProduct() {
    console.log(this.currentProduct);

    const formData = new FormData();

    // Append text fields
    formData.append('title', this.currentProduct.title);
    formData.append('description', this.currentProduct.description);
    formData.append('price', this.currentProduct.price.toString());
    formData.append('categoryId', this.currentProduct.categoryId);
    formData.append('stockStatus', this.currentProduct.stockStatus);

    // Append sizes if needed
    this.currentProduct.sizes.forEach((size, index) => {
      formData.append(`sizes[${index}][size]`, size.size);
      formData.append(`sizes[${index}][stock]`, size.stock.toString());
      formData.append(`sizes[${index}][_id]`, size._id);
    });

    // Append image file (File object)
    if (this.currentProduct.imageFile) {
      formData.append('image', this.currentProduct.imageFile);
    }

    if (this.isEditing) {
      this.productsService.updateProduct(this.currentProduct._id!, formData).subscribe(console.log);
    } else {
      this.productsService.addProduct(formData).subscribe(console.log);
    }
    this.router.navigate(['/admin/products']);
  }

  addSize() {
    this.currentProduct.sizes.push({ size: '', stock: 0, _id: Date.now().toString() });
  }
  removeSize(index: number) {
    this.currentProduct.sizes.splice(index, 1);
  }
}
