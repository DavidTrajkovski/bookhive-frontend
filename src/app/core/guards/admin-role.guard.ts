import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/authentication/auth.service';
import { inject } from '@angular/core';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    return router.createUrlTree(['/unauthorized']);
  }
};
