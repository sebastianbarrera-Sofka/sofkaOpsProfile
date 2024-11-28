import { Component, Inject, inject, ɵɵqueryRefresh } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../projects/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, FormsModule],
})
export class DialogConfirmation {
  readonly dialog = inject(MatDialog);
  private snackBar: MatSnackBar;
  private idNewProject: string;
  constructor(
    snackBar: MatSnackBar,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private router: Router
  ) {
    this.snackBar = snackBar;
    this.idNewProject = this.data.id;
  }
  checked = false;
  deleteProject() {
    if (this.checked) {
      this.projectService.deleteProject(this.idNewProject).subscribe({
        next: (res) => {
          this.snackBar.open('Proyecto eliminado con exito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.dialog.closeAll();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.snackBar.open('No se pudo eliminar el proyecto. Por favor, inténtalo de nuevo.', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar-error'],
          });
          this.dialog.closeAll();
        },
        complete: () => {
          console.log('Eliminando proyecto completado');
        }
      });
      this.dialog.closeAll();
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}