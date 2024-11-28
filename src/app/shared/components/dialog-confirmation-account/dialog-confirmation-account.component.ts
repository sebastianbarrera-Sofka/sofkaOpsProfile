import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../projects/project.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../accounts/account.service';

@Component({
  selector: 'dialog-confirmation-account',
  templateUrl: './dialog-confirmation-account.component.html',
  styleUrls: ['./dialog-confirmation-account.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, FormsModule],
})
export class DialogConfirmationAccount {
  readonly dialog = inject(MatDialog);
  private snackBar: MatSnackBar;
  private idAccount: string;
  constructor(
    snackBar: MatSnackBar,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private router: Router
  ) {
    this.snackBar = snackBar;
    this.idAccount = this.data.id;
  }
  checked = false;

  deleteAccount() {
    if (this.checked) {
      this.accountService.deleteAccount(this.idAccount).subscribe({
        next: (res) => {
          this.snackBar.open('Cuenta eliminado con exito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.dialog.closeAll();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.snackBar.open('No se pudo eliminar la Cuenta. Por favor, inténtalo de nuevo.', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar-error'],
          });
          this.dialog.closeAll();
        },
        complete: () => {
          console.log('Eliminando Cuenta completado');
        }
      });
      this.dialog.closeAll();
    }
  }


  closeDialog() {
    this.dialog.closeAll();
  }
}