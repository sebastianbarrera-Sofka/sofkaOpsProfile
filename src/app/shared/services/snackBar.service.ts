import { Inject } from "@angular/core";
import {
    MatSnackBar,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef,
} from '@angular/material/snack-bar';

/**
 * Servicio para mostrar mensajes de notificación en la pantalla
 */

@Inject({ providedIn: 'root' })
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
        });
    }
}


