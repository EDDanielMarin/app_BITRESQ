import { HttpInterceptor, HttpRequest } from '@angular/common/http/';
import { HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenInterceptorProvider implements HttpInterceptor {


  private val: String = ''
  constructor(public _storage: Storage) {
    /*_storage.get('jwt').then((resp) => {
      this.val = resp
      console.log(resp)
    });*/
    this.val=localStorage.getItem('jwt')
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
      
    });
    return next.handle(request);
  }

}


