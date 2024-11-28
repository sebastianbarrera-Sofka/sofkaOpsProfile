import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

  /**
   * Componente para la página de login, contiene un botón para iniciar sesión con Google
   */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private API_URL = `${environment.API_RUL_LOGIN}`;

  async loginWithGoogle() {
    const idToken = await this.authService.loginWithGoogle();
    this.http
      .post(this.API_URL, { idToken })
      .subscribe(
        (response: any) => {
          console.log(response, 'login');
          localStorage.setItem('id', response.Id);
          localStorage.setItem('userToken', response.accessToken);
          this.authService.setRole(response.roles);
          this.authService.setEmail(response.email);
          this.authService.setAccounts(response.accounts);
          this.authService.setUuid(response.id);
          this.router.navigate(['/dashboard']);
          console.log(response.id);
        },
        (error) => {
          console.error('Login failed:', error);
          console.log(error.message);
        }
      );
  }
}





//  async loginWithGoogle() {
//   const idToken = await this.authService.loginWithGoogle();
//   this.http
//     .post(this.API_URL, { idToken })
//     .subscribe(
//       (response: any) => {
//         console.log(response)
//         localStorage.setItem('userToken', response.accessToken);
//         this.authService.setRole(response.roles);
//         this.authService.setEmail(response.email);
//         this.authService.setAccounts(response.accounts);
//         this.router.navigate(['/dashboard']);
//       },
//       (error) => {
//         console.error('Login failed:', error);
//       }
//     );
// }