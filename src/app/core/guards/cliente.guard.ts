import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const ClienteGuard: CanActivateFn = () => {

  const session = inject(SessionService);
  const router = inject(Router);

  if (session.rolActual() === 'cliente') {

      return true;
  }

  return router.createUrlTree(['/login']);
};
