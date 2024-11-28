// import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { ComponentType } from '@angular/cdk/portal';

/**
 * Servicio para abrir y cerrar modales
 */

// export enum ModalActionFunction {
//     view = 'view',
//     edit = 'edit',
//     create = 'create'
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class ModalService {
//     constructor(private dialog: MatDialog) { }

//     open<T>(component: ComponentType<T>, action: ModalActionFunction, userData?: any) {
//         return this.dialog.open(component, {
//             data: {
//                 action,
//                 user: userData
//             }
//         });
//     }

//     closeAll(): void {
//         this.dialog.closeAll();
//     }
// }