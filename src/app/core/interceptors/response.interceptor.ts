import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function responseInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return next(req).pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
            const dataNew = event.body.data;
            console.log(event.body);
            const data = JSON.parse(dataNew);
            console.log(data);
        }
    }));
}