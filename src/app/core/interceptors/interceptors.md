

# Interceptores

Los interceptores son componentes que se encargan de interceptar las solicitudes HTTP y manipularlas antes de que se envíen a la siguiente capa de la aplicación. Los interceptores se utilizan para agregar funcionalidad adicional a las solicitudes HTTP, como autenticación, validación de datos, y otras funcionalidades específicas de la aplicación.

## AuthInterceptor

El `AuthInterceptor` es un interceptor que se encarga de agregar la autenticación a las solicitudes HTTP. Esto se logra mediante la inyección del servicio `AuthService` y la verificación de si el usuario está autenticado. Si el usuario no está autenticado, se redirige al login.

## ErrorHandlerInterceptor

El `ErrorHandlerInterceptor` es un interceptor que se encarga de manejar las respuestas HTTP con un código de estado diferente a 200. Esto se logra mediante la inyección del servicio `ErrorHandlerService` y la verificación de si la respuesta es un error. Si la respuesta es un error, se redirige al error 404.