import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { tecnologias } from "../../data/technologies.data";

@Injectable({
    providedIn: 'root'
})
export class TechnologiesService {
    constructor(private http: HttpClient) { }

    getTechnologies(): Observable<any> {
        const technologies = this.http.get<any>(`${environment.API_URL}/${environment.EDPOINT_GET_TECHNOLOGIES}`);
        console.log('Technologies service:', technologies);
        return technologies;
    }

    techSelectedFront(tech: any[], projectId: string) {
        let cantidad = tech.length;
        let arrayTecnologias = [];
        let arrayTecnologiasAgregadas = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "05796ce5-9ce5-4768-baf8-c016685edebd", name: "FrontEnd", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.frontend.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
            let tecnologiaAdded =
            {
                projectId: projectId,
                typeTechStackId: "05796ce5-9ce5-4768-baf8-c016685edebd",
                techStacksId: tech[i],
                activo: true
            }
            arrayTecnologiasAgregadas.push(tecnologiaAdded);
        }
        return arrayTecnologiasAgregadas
    }
    techSelectedBackend(tech: any[]) {
        let cantidad = tech.length;
        let arrayTecnologias = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "339783ef-4722-4dcd-a9ee-7b924894d825", name: "BackEnd", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.backend.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
        }
        return arrayTecnologias
    }
    techSelectedMobile(tech: any[]) {
        let cantidad = tech.length;
        let arrayTecnologias = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "e226c241-3651-4e8a-9967-efbf0a706d4a", name: "Mobile", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.mobile.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
        }
        return arrayTecnologias
    }
    techSelectedDatabase(tech: any[]) {
        let cantidad = tech.length;
        let arrayTecnologias = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "e092bf47-ce04-4863-8007-89db72d9f72d", name: "Database", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.database.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
        }
        return arrayTecnologias
    }
    techSelectedDevOps(tech: any[]) {
        let cantidad = tech.length;
        let arrayTecnologias = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "bd02bff8-59aa-4d4d-a971-3cf2897638c2", name: "DevOps", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.devSecOps.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
        }
        return arrayTecnologias
    }
    techSelectedCloud(tech: any[]) {
        let cantidad = tech.length;
        let arrayTecnologias = [];

        for (let i = 0; i < cantidad; i++) {
            let objeto = {
                id: "55cf7177-531e-4ae6-8cc7-f83c4c3a11e1", name: "Cloud", techStacks:
                    [
                        {
                            id: tech[i],
                            name: tecnologias.cloud.find(item => item.id === tech[i])?.name
                        }
                    ]
            }
            arrayTecnologias.push(objeto);
        }
        return arrayTecnologias
    }
}