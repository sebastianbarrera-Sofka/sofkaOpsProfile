import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/**
 * Guarda para verificar si el usuario está autenticado y si es el administrador
 * Contiene métodos para verificar si el usuario está autenticado y si es el administrador, y si no lo es, redirige al login.
 */

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }


  canActivateAdmin(): boolean {
    const userRole = this.authService.getRole();
    if (userRole === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}