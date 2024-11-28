import { Component, Injectable, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SearcherComponent } from '../../shared/components/searcher/searcher.component';
import { FormProjectsComponent } from '../../projects/components/form-projects.component';
import { ComponentType } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../shared/components/theme/theme.service';
import { AccountService } from '../../accounts/account.service';
import { AccountComponent } from '../../accounts/components/account.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserData } from '../../shared/interfaces/users.interface';


/**
 * Componente principal de la aplicación, muestra la información de la cuenta y las operaciones asociadas a ella.
 */

// Tipo para mapear los diferentes componentes que se pueden abrir en la modal
type ComponentMap = {
  [key: string]: ComponentType<any>;
};

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    SearcherComponent,
    MatIconModule,
    AsyncPipe,
    MatTooltipModule,
    CommonModule
  ],
})
export class DashboardComponent implements OnInit {

  public role: string | null;
  public accounts$: Observable<any[]>;
  quantitySofkianos = signal<number>(0);
  themes = signal<boolean>(false);
  users = signal<UserData[]>([]);
  public transversalArchitectName?: string | null;
  public transversalTechLeadId?: string | null;
  public accountLoad = signal<any[]>([]);


  componentMap: ComponentMap = {
    OpsProfileComponent: AccountComponent,
    FormProjectsComponent: FormProjectsComponent,
  }

  constructor(
    public authService: AuthService,
    public accountService: AccountService,
    public dialog: MatDialog,
    private userService: UserService,
    private themeService: ThemeService,
  ) {
    this.role = this.authService.getRole();
    this.accounts$ = this.accountService.accounts$.pipe(
      map(accounts => this.filterActiveProjects(accounts))
    );
    this.themeService.typeTheme$.subscribe(theme => this.themes.set(theme));
  }

  ngOnInit() {
    this.loadAccounts();
    this.getUsers();
  }

  dataAccount(accounts: any) {
    this.quantitySofkianosFn(accounts);
    this.accountService.getAccountByOpsProfile(accounts.id).subscribe({
      next: (response) => {
        if (response.status === "Success") {
          const data: any = JSON.parse(response.data);
          localStorage.setItem('accounts', data.accountId);
          const user = data.transversalTechLeadId;
          this.transversalTechLeadId = this.users().find(item => item.id == user)?.name;
        }
      },
      error: (err) => console.error('Error al cargar cuentas:', err)
    });
  }

  getUsers() {
    this.userService.getUser().subscribe({
      next: (response: any) => {
        if (response.status === "Success") {
          const data: any[] = JSON.parse(response.data);
          const email = localStorage.getItem('email');
          const userActive = data.find(item => item.email == email);
          localStorage.setItem('userActive', userActive.id);
          this.users.set(data);
          this.userService.getUser().subscribe({
            next: (response: any) => {
              if (response.status === "Success") {
                const data: any[] = JSON.parse(response.data);
                this.users.set(data);
                this.transversalArchitectName = this.users().find(user => user.id == this.accountLoad().find(account => account.transversalArchitectId)?.transversalArchitectId)?.name;
              }
            },
            error: (err) => console.error('Error al cargar usuarios:', err)
          });
        }
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  loadAccounts() {
    this.accountService.getAccountsAllByUser().subscribe({
      next: (response) => {
        if (response.status === "Success") {
          const data: any[] = JSON.parse(response.data);
          console.log(data, "cuentas");
          this.accountLoad.set(data);

        }
      },
      error: (err) => console.error('Error al cargar cuentas:', err)
    });
  }

  private quantitySofkianosFn(accounts: any) {
    const projects = accounts.projects;
    const proyectsActivos = projects.filter((item: any) => item.statusId !== "32da0d78-8b3b-4e68-8c55-6087474b1232");
    const sofkianos: number = proyectsActivos.reduce((sofkianos: number, project: any) => sofkianos + project.qtyDevelopmentConsultants + project.qtyEnterpriseArchitects + project.qtySolutionArchitects + project.qtyTechnicalLeads, 0);
    this.quantitySofkianos.set(sofkianos);
  }

  private filterActiveProjects(accounts: any[]): any[] {
    const CANCELED_STATUS_ID = "32da0d78-8b3b-4e68-8c55-6087474b1232";

    return accounts.map(account => ({
      ...account,
      projects: account.projects.filter((project: { statusId: string; }) => project.statusId !== CANCELED_STATUS_ID),
    }))
  }

  openModal(componentName: string, action: string, dataModal?: any) {
    const component = this.componentMap[componentName];
    if (!component) {
      console.error(`Component ${componentName} not found`);
      return;
    }
    const dialogRef = this.dialog.open(component, {
      data: {
        action,
        dataModal
      },
      width: '45%',
      height: '100%',
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadAccounts();
      }
    });
  }

  applyFilter(searchTerm: string) {
  }

}


