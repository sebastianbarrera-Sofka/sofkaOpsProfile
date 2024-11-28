import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/**
 * Guarda para verificar si el usuario está autenticado y si es el administrador
 * Contiene métodos para verificar si el usuario está autenticado y si es el administrador, y si no lo es, redirige al login. Tiene que estar autenticado para poder acceder a la página de inicio.
 */

export const authenticationGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(AuthService);
  const router = inject(Router);
  if (!userAuth.getIsActive()) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
