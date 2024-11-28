import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ThemeToggleComponent } from "../theme/theme.component";

/**
 * El navbar es el componente principal de la aplicacion, es el encargado de mostrar la barra de navegacion y el menu de la aplicacion, ademas de mostrar el nombre de usuario información de la cuenta y la opcion de cerrar sesion.
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatButtonModule, MatMenuModule, MatButtonModule, MatMenuModule, MatIconModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public photo: string | null;
  public name!: string;
  constructor(public authService: AuthService, private router: Router) {
    this.photo = authService.getUserPhoto();
    this.name = authService.getUserName();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
