import { HttpInterceptor, HttpRequest } from '@angular/common/http/';
import { HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenInterceptorProvider implements HttpInterceptor {


  private val: String = ''
  constructor(public _storage: Storage) {
    _storage.get('jwt').then((resp) => {
      this.val = resp
      console.log(resp)
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.val}`
      }
      
    });
    return next.handle(request);
  }

}


