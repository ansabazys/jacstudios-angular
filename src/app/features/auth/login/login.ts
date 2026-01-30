import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
  ) {}

  login() {
    this.loading = true;
    this.error = '';
    if (this.router.url.includes('admin')) {
       this.authService.loginAdmin(this.email, this.password).subscribe((res) => {
        this.router.navigate(['/admin/dashboard']);
      });
    } else {
      this.authService.login(this.email, this.password).subscribe((res) => {
        this.router.navigate(['/store']);
        this.productService.getProducts()
      });
    }
  }
}
