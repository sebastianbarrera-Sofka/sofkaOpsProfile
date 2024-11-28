import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor para manejar errores HTTP
 * Contiene un interceptor que maneja errores HTTP y muestra un mensaje de error en la consola.
 */

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message} status: ${error.status} Estoy en el interceptor`;
      console.log('interceptor');

    } else {
      errorMessage = `Error code: ${error.status}, message: ${error.message} status: ${error.status}: Estoy en el interceptor`;
      console.log('interceptor');
    }
    return throwError(() => errorMessage);
  }));
};
