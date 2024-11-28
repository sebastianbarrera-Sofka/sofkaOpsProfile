import { Component, Inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tecnologias } from '../../data/technologies.data';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { DialogConfirmation } from '../../shared/components/dialog-confirmation/dialog-confirmation.component';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from '../project.service';
import { ThemeService } from '../../shared/components/theme/theme.service';
import { TechnologiesService } from '../../shared/services/technologies.service';


const MATERIAL_MODULES = [MatIcon, MatDialogContent, MatDialogTitle, MatDialogActions, MatSlideToggleModule, MatSelectModule, MatTooltipModule, MatDatepickerModule, MatFormFieldModule, MatInputModule];



/**
 *  Constructor del componente FormProjectsComponent donde se inicializan los datos del formulario y se inyectan dependencias, tambien se establece el título y la acción del dialog.
 *
 * @param snackBar Inyecta snackbar para mostrar mensajes de notificación
 * @param formBuilder Inyecta form builder para crear el formulario
 * @param dialogRef Inyecta dialog ref para cerrar el dialog o abrir el modal del form
 * @param data Los datos que vienen del dialog
 */


@Component({
  selector: 'app-form-projects',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MATERIAL_MODULES, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-projects.component.html',
  styleUrls: ['./form-projects.component.css']
})
export class FormProjectsComponent implements OnInit {
  public projectForm!: FormGroup;
  public action: string;
  public title: string;
  public project: any;
  technologies = tecnologias;
  technologies2: any;
  themes = signal<boolean>(false);
  checkCopilot = signal<boolean>(false);
  checkSonar = signal<boolean>(false);
  tecnlogiasSeleccionadas: any;
  tecnologiasBd: any;

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; dataModal?: any },
    readonly dialog: MatDialog,
    private themeService: ThemeService,
    private technologyService: TechnologiesService
  ) {
    this.action = data.action;
    this.project = data.dataModal.proyecto || {};
    this.themeService.typeTheme$.subscribe(theme => this.themes.set(theme));
    this.technologies = tecnologias;
    // this.tecnlogiasSeleccionadas = this.technologies.frontend.map((item: any) => item.name);
    // this.tecnologiasBd = this.project.typeTechStacks.map((name: any) => name.techStacks.map((tech: any) => tech.name))


    switch (this.action) {
      case 'Crear':
        this.title = 'Crear Proyecto';
        break;
      case 'Editar':
        this.title = 'Editar Proyecto';
        break;
      default:
        this.title = 'Ver Proyecto';
        break;
    }
  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.projectForm = this.formBuilder.group({
      Name: [this.project.name || '', Validators.required],
      ServiceModalityId: [this.project.serviceModalityId || 'bae17a24-b4f4-42ec-a93f-1e67359cca3f', Validators.required],
      startDate: [this.project.startDate ? new Date(this.project.startDate) : null],
      endDateEstimated: [this.project.endDateEstimated ? new Date(this.project.endDateEstimated) : null, Validators.required],
      StatusId: [this.project.statusId || 'bf150669-b6e0-49ce-9a3a-8d9af7b08a08', Validators.required],

      qtyTotalSofkianosInProject: [this.project.qtyEnterpriseArchitects + this.project.qtySolutionArchitects + this.project.qtyTechnicalLeads + this.project.qtyDevelopmentConsultants || this.project.qtyEnterpriseArchitects + this.project.qtySolutionArchitects + this.project.qtyTechnicalLeads + this.project.qtyDevelopmentConsultants,],
      qtyEnterpriseArchitects: [this.project.qtyEnterpriseArchitects || 0, Validators.required],
      qtySolutionArchitects: [this.project.qtySolutionArchitects || 0, Validators.required],
      qtyTechnicalLeads: [this.project.qtyTechnicalLeads || 0, Validators.required],
      qtyDevelopmentConsultants: [this.project.qtyDevelopmentConsultants || 0, Validators.required],

      // StackTech
      frontend: [this.project.typeTechStacks?.frontend || ['JavaScript']],
      backend: [this.project.typeTechStacks?.backend || ['.Net']],
      mobile: [this.project.typeTechStacks?.mobile || ['']],
      database: [this.project.typeTechStacks?.database || ['']],
      devOps: [this.project.typeTechStacks?.devOps || ['']],
      otros: [this.project.typeTechStacks?.otros || ['']],
      cloud: [this.project.typeTechStacks?.cloud || [' ']],
      useCopilotLicense: [this.project.useCopilotLicense || false],
      qtyCopilotLicenses: [this.project.qtyCopilotLicenses || 0],
      useSonar: [this.project.useSonar || false],
      qtySonarLicenses: [this.project.qtySonarLicenses || 0],
      bussinesContext: [this.project.bussinesContext || '']
    });

    if (this.action === 'Ver') {
      this.projectForm.disable();
    }

    if (this.action === 'Crear' || this.action === 'Editar') {
      this.projectForm.get('qtyTotalSofkianosInProject')?.disable();
    }
    // this.tecnlogiasSeleccionadas.filter((tech: any) => [...new Set(this.tecnologiasBd.flat())].includes(tech))]
    // const databaseTech = [...new Set(this.tecnologiasBd.flat())];
    // const filteredTechnologies = this.tecnlogiasSeleccionadas.filter((tech:any) => databaseTech.includes(tech));
    // console.log("Filtered Technologies:", filteredTechnologies);
    // const nuevo = this.tecnlogiasSeleccionadas.filter((tech: any) => [...new Set(this.tecnologiasBd.flat())].includes(tech));
    // console.log("Nuevo:", nuevo);

  }

  onCopilotToggle(event: any) {
    this.checkCopilot.set(event.checked);
  }

  onSonarToggle(event: any) {
    this.checkSonar.set(event.checked);
  }

  updateProject(project: any, front: any) {
    this.projectService.updateProject(project).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          this.snackBar.open('Proyecto actualizado con éxito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.projectService.changeStack(front).subscribe({
            next: (res) => {
              if (res.status === "Success") {
                this.snackBar.open('Tecnologías actualizadas con éxito 🎉', 'Aceptar', {
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                  panelClass: ['custom-snackbar'],
                });
                this.dialogRef.close(true);
              }
            },
            error: (err) => {
              console.error('Error al actualizar tecnologías:', err);
            },
          });
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('Error al actualizar el proyecto:', err);
      },
    });
  }

  createProject(project: any, front: any) {
    this.projectForm.markAllAsTouched();
    this.projectService.createProject(project).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          this.snackBar.open('Proyecto creado con éxito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.projectService.changeStack(front).subscribe();
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        console.error('Error al crear el proyecto:', err);
      },
      complete: () => {
        console.log('Creación de proyecto completada');
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const front = this.projectForm.get('frontend')?.value;
      const techFront = this.technologyService.techSelectedFront(front, this.project.id)
      console.log('techFront', techFront);
      const projectData = this.projectForm.value;
      if (this.action === 'Editar') {
        const updatedProject = { ...projectData, id: this.project.id, userId: localStorage.getItem('userActive'), accountId: localStorage.getItem('accounts'), frontend: techFront };
        this.updateProject(updatedProject, techFront);

      } else if (this.action === 'Crear') {
        const newProject = { ...projectData, userId: localStorage.getItem('userActive'), accountId: localStorage.getItem('accounts'), frontend: techFront };
        this.createProject(newProject, techFront);
      }
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-snackbar-error'],
      });
    }
  }

  deletedProject(id: string) {
    this.dialog.open(DialogConfirmation, { data: { id } });
  }
}