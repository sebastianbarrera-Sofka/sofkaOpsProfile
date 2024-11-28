import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


/**
 * Servicio encargado para la gestion de cuentas, se encarga de gestionar las operaciones CRUD sobre las cuentas existentes y sobre la creacion de nuevas cuentas.
 */

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountsSubject = new BehaviorSubject<any[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAccountsAllByUser(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${environment.EDPOINT_ACCOUNTS}`).pipe(
      tap(response => {
        if (response.status === "Success") {
          const data: any[] = JSON.parse(response.data);
          this.accountsSubject.next(data);
        }
      })
    );
  }


  createAccount(account: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/${environment.EDPOINT_CREATE_ACCOUNT}`, account).pipe(
      tap(newAccount => {
        const currentAccounts = this.accountsSubject.value;
        this.accountsSubject.next([...currentAccounts, account]);
      })
    );
  }

  updateAccountOpsProfile(data: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/${environment.EDPOINT_UPDATE_OPSPROFILEANDACCOUNT}`, data).pipe(
      tap(response => {
        if (response.status === "Success") {
          this.getAccountsAllByUser().subscribe();
        }
      })
    );
  }

  getAccountByOpsProfile(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${environment.EDPOINT_GET_ACCOUNTS_OPSPROFILE}=${id}`).pipe(
      tap(response => {
        if (response.status === "Success") {
          const data: any[] = JSON.parse(response.data);
        }
      })
    );
  }


  deleteAccount(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/${environment.EDPOINT_DELETE_ACCOUNT}?idAccount=${id}`).pipe(
      tap(response => {
        if (response.status === "Success") {
          this.getAccountsAllByUser().subscribe();
        }
      })
    );
  }

  updateAccount(account: any): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/${environment.EDPOINT_CREATE_ACCOUNT}`, account).pipe(
      tap(() => this.getAccountsAllByUser().subscribe())
    );
  }


  updateAccounts(updatedAccounts: any[]) {
    this.accountsSubject.next(updatedAccounts);
  }


}