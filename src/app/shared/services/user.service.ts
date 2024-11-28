import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UserData } from "../interfaces/users.interface";
import { filter, map, Observable } from "rxjs";

/**
 * Servicio para obtener información de los usuarios como nombre, foto, ID, etc. Resgistrados en la aplicación.
 */

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }



    getUser(): Observable<any> {
        const users = this.http.get<UserData[]>(`${environment.API_URL}/${environment.EDPOINT_USER}`);
        return users;
    }

}