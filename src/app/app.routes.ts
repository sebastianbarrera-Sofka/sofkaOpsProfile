import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authenticationGuard } from './core/guards/authentication.guard';
// import { AccountComponent } from './pages/account/account.component';
// import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  // { path: 'account', component: AccountComponent },
  // { path: 'project', component: ProjectComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authenticationGuard] },
  { path: '**', redirectTo: '/login' }
];

