import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';

/**
 * Servicio de autenticación
 * Contiene métodos para iniciar sesión y cerrar sesión, así como métodos para obtener información sobre el usuario
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string = '';
  isActive: boolean = false;
  idUser: string = '';
  userPhoto: string = '';
  idToken: any = '';
  constructor(private auth: Auth) { }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(this.auth, provider);
      const user = await credentials.user;
      const idToken = user.getIdToken();
      this.idToken = idToken;
      this.userPhoto = user.photoURL || 'https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg?w=360';
      this.username = user.displayName!;
      localStorage.setItem('userPhoto', this.userPhoto);
      localStorage.setItem('name', this.username);
      this.isActive = true;
      return idToken;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        console.error('El popup fue cerrado por el usuario.');
      } else {
        console.error('Error durante el inicio de sesión:', firebaseError);
      }
      throw error;
    }
  }


  /**
   * Diferentes métodos para obtener información del usuario que está autenticado, como su nombre, foto, ID, etc. Estos métodos se utilizan en diferentes componentes para mostrar o actualizar información del usuario.
   */

  getIsActive() {
    return this.isActive;
  }

  getUserName() {
    return this.username;
  }

  getUserEmail() {
    return localStorage.getItem('email');
  }

  getUserPhoto() {
    return this.userPhoto || localStorage.getItem('userPhoto');
  }


  getUuid() {
    return localStorage.getItem('ops-uuid');
  }

  setUsername(username: string) {
    this.username = username;
  }

  setUuid(uuid: string) {
    localStorage.setItem('uuid', String(uuid));
  }

  async logout() {
    localStorage.removeItem('ops-user');
    await signOut(this.auth);
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('accounts');
  }


  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  setAccounts(account: string) {
    localStorage.setItem('accounts', account);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('ops-userToken');
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
