import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  loading = false;
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.loading = true;
    this.error.set('');

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (res) => {
        console.log('Register successfull');
        this.loading = false;

        this.router.navigate(['/store']);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Register failed');
        this.loading = false;
      },
    });
  }
}
