import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor para agregar headers personalizados a las solicitudes HTTP
 * Contiene un interceptor que agrega headers personalizados a las solicitudes HTTP, como el token de autenticación, el rol del usuario, las cuentas asociadas al usuario, etc.
 */

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');
  const role = localStorage.getItem('role');
  const accounts = localStorage.getItem('accounts');

  // Inicializa los headers sin valores 'null'
  const headers: Record<string, string> = {};

  // Agregar Authorization solo si token no es null
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Agregar el rol si no es null
  if (role) {
    headers['x-roles'] = role;
  }

  // Agregar las cuentas si no son null
  if (accounts) {
    headers['x-accounts'] = accounts;
  }

  // Añade un header custom adicional
  headers['Custom-Header'] = 'CustomHeaderValue';

  // Asegura que el Content-Type sea JSON
  headers['Content-Type'] = 'application/json';

  // Clona la solicitud agregando solo los headers que no sean null
  const modifiedReq = req.clone({
    setHeaders: headers
  });

  // console.log('Interceptor triggered with headers:', headers);

  return next(modifiedReq);
};
