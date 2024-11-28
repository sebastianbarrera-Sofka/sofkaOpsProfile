# Guards

Los guards son componentes que se encargan de verificar si un usuario está autorizado para acceder a una ruta determinada. Los guards se utilizan para controlar el acceso a diferentes rutas y funciones de la aplicación.

## AuthGuard

El `AuthGuard` es un guard que se encarga de verificar si el usuario está autenticado y si es el administrador. Si el usuario no está autenticado o no es el administrador, se redirige al login.

## AdminGuard

El `AdminGuard` es un guard que se encarga de verificar si el usuario está autenticado y si es el administrador. Si el usuario no está autenticado o no es el administrador, se redirige al dashboard.
