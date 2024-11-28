import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';
import { CountryData } from '../../data/country.data';
import { UserData } from '../../shared/interfaces/users.interface';
import { ThemeService } from '../../shared/components/theme/theme.service';
import { AccountService } from '../account.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../auth/auth.service';
import { DialogConfirmationAccount } from '../../shared/components/dialog-confirmation-account/dialog-confirmation-account.component';
import { v4 as uuidv4 } from 'uuid';

const MATERIAL_MODULES = [ReactiveFormsModule, MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule];

@Component({
  selector: 'app-ops-profile',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MATERIAL_MODULES, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  action: string;
  title: string;
  users = signal<UserData[]>([]);
  themes = signal<boolean>(false);
  account: any;
  formOpsProfile!: FormGroup;
  country = CountryData;
  opsProfile: any;
  role: string | null;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AccountComponent>,
    private userService: UserService,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; dataModal: any },
    private themeService: ThemeService,
    private authService: AuthService,
    readonly dialog: MatDialog,
  ) {
    this.action = data.action;
    this.account = data.dataModal.account || {};
    this.themeService.typeTheme$.subscribe(theme => this.themes.set(theme));
    this.role = this.authService.getRole();
    switch (this.action) {
      case 'Crear':
        this.title = 'Crear Cuenta';
        break;
      case 'Editar':
        this.title = 'Editar Cuenta';
        break;
      default:
        this.title = 'Ver Cuenta';
        break;
    }

    this.initForm();
  }

  ngOnInit() {
    this.loadOpsProfileData();
    this.loadUsersData();
  }

  initForm() {
    this.formOpsProfile = this.formBuilder.group({
      Name: ['', Validators.required],
      OperationManagerId: ['', Validators.required],
      operatoperationManagerName: [''],
      serviceManagerName: [''],
      ServiceManagerId: [''],
      TransversalArchitectId: [''],
      QtyTotalSofkianosCoEDev: [0],
      profitMarginPercentage: [0],
      transversalTechLeadId: [''],
      AvgMonthlyBillingInThousandsUSD: [0],
      Country: [''],
      Projects: [''],
      serviceModality: [''],
      workMethodology: [''],
      date: ['', Validators.required]
    });

    if (this.action === 'Ver') {
      this.formOpsProfile.disable();
    }
  }

  loadOpsProfileData() {
    this.accountService.getAccountByOpsProfile(this.account.id).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          const data = JSON.parse(res.data);
          this.opsProfile = data;
          this.updateFormWithLoadedData();
        }
      },
      error: (err) => {
        console.error('Error al cargar cuenta:', err);
      },
    });
  }

  loadUsersData() {
    this.userService.getUser().subscribe({
      next: (res) => {
        if (res.status === "Success") {
          const data = JSON.parse(res.data);
          this.users.set(data);
        }
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  updateFormWithLoadedData() {
    if (this.formOpsProfile && this.account && this.opsProfile) {
      this.formOpsProfile.patchValue({
        Name: this.action === "Editar" || this.action === "Ver" ? this.account.name : '',
        OperationManagerId: this.account.operationManagerId || '',
        OperationManagerName: this.account.operationManagerName || '',
        ServiceManagerId: this.account.serviceManagerId || '',
        ServiceManagerName: this.account.serviceManagerName || '',
        TransversalArchitectId: this.account.transversalArchitectId || '',
        transversalTechLeadId: this.opsProfile.transversalTechLeadId || '',
        QtyTotalSofkianosCoEDev: this.action === "Editar" || this.action === "Ver" ? this.account.qtyTotalSofkianosCoEDev : 0,
        profitMarginPercentage: this.account.profitMarginPercentage || 0,
        AvgMonthlyBillingInThousandsUSD: this.account.avgMonthlyBillingInThousandsUSD || 0,
        Country: this.account.country || '',
        Projects: this.action === "Editar" || this.action === "Ver" ? this.account.projects.map((project: any) => project.name).join(', ') : '',
        workMethodology: this.action === "Editar" || this.action === "Ver" ? this.opsProfile.workMethodology : '',
        serviceModality: this.action === "Editar" || this.action === "Ver" ? this.opsProfile.serviceModalityId : '',
        date: this.action === "Editar" || this.action === "Ver" ? this.opsProfile.date : ''
      });

    }
    this.formOpsProfile.get('Projects')?.disable();
    if (!this.opsProfile) {
      console.log("no ops profile");
    }
  }


  createAccount(account: any) {
    this.accountService.createAccount(account).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          this.snackBar.open('Cuenta creada con éxito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.error('Error al crear la cuenta:', err);
      },
    });
  }

  updateAccount(data: any) {
    this.accountService.updateAccountOpsProfile(data).subscribe({
      next: (res) => {
        if (res.status === "Success") {
          console.log('Datos actualizados', res);
          this.snackBar.open('Cuenta actualizados con éxito 🎉', 'Aceptar', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar'],
          });
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.error('Error al actualizar la cuenta:', err);
        console.error('Error al actualizar la cuenta y perfil de operaciones:', err);
        this.snackBar.open('Error al actualizar. Por favor, intente de nuevo.', 'Cerrar', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['custom-snackbar-error'],
        });
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.formOpsProfile.valid) {
      const formData = this.formOpsProfile.value;
      if (this.action === 'Editar') {
        const dataOpsProfile = this.opsProfile;
        const dataAccount = {
          opsProfile: {
            id: this.opsProfile ? this.opsProfile.id : uuidv4(),
            date: formData.date,
            workMethodology: formData.workMethodology,
            accountId: this.account.id,
            operationManagerId: "1170567d-9fa6-4640-b9c0-4f4b9323b9b9",
            serviceModalityId: formData.serviceModality,
            serviceManagerId: "1170567d-9fa6-4640-b9c0-4f4b9323b9b9",
            transversalArchitectId: formData.transversalArchitectId,
            transversalTechLeadId: formData.transversalTechLeadId,
            projectName: "string",
            serviceModel: "string",
            operationTime: 10,
            qtyTotalSofkianos: 10,
            qtyTotalProjects: 10,
            qtyTotalTechLead: 10,
            qtyTotalSolutionArchitectsBusiness: 10,
            businessContext: "nuevo",
            technicalStack: "string"
          },
          account: {
            id: this.account.id,
            name: formData.Name,
            qtyTotalSofkianosCoEDev: formData.QtyTotalSofkianosCoEDev,
            qtyTotalProject: formData.QtyTotalProject,
            profitMarginPercentage: formData.ProfitMarginPercentage,
            avgMonthlyBillingInThousandsUSD: formData.AvgMonthlyBillingInThousandsUSD,
            country: formData.Country,
            financialId: "5a65fd0b-5ce2-4ba7-a386-bc56c927acf2",
            operationId: "bc2b11f1-e60e-4518-87b4-9670c6cacc53",
            operationManagerId: formData.OperationManagerId,
            operationManagerName: "sebastian",
            serviceManagerId: formData.ServiceManagerId,
            serviceManagerName: "string",
            transversalArchitectId: formData.TransversalArchitectId,
            transversalArchitectName: "string",
            projects: []
          }
        };
        this.updateAccount(dataAccount);
      } else if (this.action === 'Crear') {
        const newAccount = {
          name: formData.Name,
          OperationManagerId: formData.OperationManagerId
        };
        this.createAccount(newAccount);
      }
    } else {
      this.formOpsProfile.markAllAsTouched();
    }
  }

  deleteAccount() {
    this.dialog.open(DialogConfirmationAccount, {
      data: { id: this.account.id },
    });
  }
}