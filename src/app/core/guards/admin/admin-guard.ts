import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map((user) => {
      if (user?.role === 'superadmin') {
        return true;
      }

      return router.createUrlTree(['/store/admin/login']);
    }),
  );
};
