import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const AuthGuard: CanActivateFn = () => {

    const session = inject(SessionService);
    const router = inject(Router);

    if (!session.isLogged()) {
      
        router.navigate(['/auth']);
        return false;
    }

    return true;
};