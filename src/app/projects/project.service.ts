import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountService } from '../accounts/account.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}`);
  }

  getProjectsById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${environment.EDPOINT_PROJECTS}/get-projects-by-id?id=${id}`)
  }

  getProjectExpecif() {
    return this.http.get<any>(`${environment.API_URL}/${environment.EDPOINT_PROJECTS}/get-projects-by-id?id=2a391a5d-7c44-4e71-a253-a7635b3edf65`)

  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/${environment.EDPOINT_PROJECTS}`, project).pipe(
      tap(() => this.updateAccountsAfterProjectChange())
    );
  }

  updateProject(project: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/${environment.EDPOINT_PROJECTS}`, project).pipe(
      tap(() => this.updateAccountsAfterProjectChange())
    );
  }

  deleteProject(projectId: string): Observable<any> {
    return this.getProjectsById(projectId).pipe(
      switchMap((project: any) => {
        const projectData = JSON.parse(project.data);
        console.log("projectData", projectData);

        const updatedProject = { ...projectData, statusId: '32da0d78-8b3b-4e68-8c55-6087474b1232' };
        console.log("updatedProject, hasta aca llega", updatedProject);
        return this.http.post<any>(
          `${environment.API_URL}/${environment.EDPOINT_PROJECTS}`,
          updatedProject
        );
      }),
      tap(() => this.updateAccountsAfterProjectChange()),
      catchError((error) => {
        console.error('Error al eliminar el proyecto:', error);
        return throwError(() => new Error('No se pudo eliminar el proyecto. Por favor, inténtalo de nuevo.'));
      })
    );
  }

  changeStack(techStack: any) {
    return this.http.post<any>(`${environment.API_URL}/${environment.ENDPOINT_CHANGE_STACK}`, techStack).pipe(
      catchError((error) => {
        console.error('Error actualizar tecnologias:', error);
        return throwError(() => new Error('No se pudo actualizar la tecnología. Por favor, inténtalo de nuevo.'));
      })
    );
  }

  private updateAccountsAfterProjectChange() {
    this.accountService.getAccountsAllByUser().subscribe();
  }
}