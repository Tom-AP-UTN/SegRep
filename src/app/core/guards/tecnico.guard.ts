import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const TecnicoGuard: CanActivateFn = () => {

  const session = inject(SessionService);
  const router = inject(Router);

  if (session.rolActual() === 'tecnico') {

      return true;
  }

  return router.createUrlTree(['/login']);
};