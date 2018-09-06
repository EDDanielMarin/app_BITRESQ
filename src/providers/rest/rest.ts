import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }
  )
  };
  private url:string=""
  constructor(private _http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  public setUrl(modulo)
  {
    var u= "https://immense-fjord-51072.herokuapp.com/"
    return u.concat(modulo);
  }
  
  
  ejecutaPost(url,data):Observable<any>
  {
      this.url=this.setUrl(url)
      return this._http.post<any>(this.url,data,this.httpOptions)
      
  }
  ejecutaGet(url): Observable<any> 
  {

    this.url=this.setUrl(url)
    console.error(this.url)
    return this._http.get<any>(this.url,this.httpOptions)
   
  }

  ejecutaPut(url,data):Observable<any>
  {
    this.url=this.setUrl(url)
    return this._http.put(url,data,this.httpOptions)
    
  }

  
  ejecutaDelete(url):Observable<any>
  {
       return this._http.delete(url,this.httpOptions);
  }
  ejecutaDeleteId(url):Observable<any>
  {
     return this._http.delete(url,this.httpOptions);
  }
/*
  private handleError(error: HttpErrorResponse) {
    var resp:any;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      
     // console.error('Error', error.error.message);
      resp={estado:"Error",mensaje:error.error.message,codigo:"500"}
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      resp={estado:"Error del Backend ",mensaje:error.error,codigo: error.status}

    
    }
    // return an observable with a user-facing error message
    return throwError(resp);
    
  };

  */

}
