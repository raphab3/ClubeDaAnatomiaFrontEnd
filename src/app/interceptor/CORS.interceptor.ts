import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CORSInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let req: HttpRequest<any> = this.addToken(request)

    if (req.headers.has('enctype')) {
      req = req.clone({
        headers: req.headers.delete('Content-Type')
      })
    }
    return next.handle(req)
  }

  private addToken(request) {

    if (!request.url.match('/api/')) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return request
    }

    request = request.clone({
      setHeaders: {
        Accept: "application/json",
      }
    });

    return request;
  }
}
