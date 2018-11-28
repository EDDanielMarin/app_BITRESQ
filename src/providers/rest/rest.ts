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
    //var u= "https://immense-fjord-51072.herokuapp.com/"
    var u="http://70.37.56.132:3000/" 

    //var u= "http://localhost:3000/"
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
    return this._http.get<any>(this.url,this.httpOptions)
   
  }

  ejecutaPut(url,data):Observable<any>
  {
    this.url=this.setUrl(url)
    return this._http.put(this.url,data,this.httpOptions)
    
  }
  ejecutaDelete(url):Observable<any>
  {
       return this._http.delete(url,this.httpOptions);
  }
  ejecutaDeleteId(url):Observable<any>
  {
     return this._http.delete(url,this.httpOptions);
  }
  uploadFile(url,data:FormData):Observable<any>
  {
    this.url=this.setUrl(url)
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" })
    }
    return this._http.post(this.url,data,HttpUploadOptions)
  }

  
  

  ddToDms(lat, lng) {

    var lat = lat;
    var lng = lng;
    var latResult, lngResult, dmsResult;

    // Make sure that you are working with numbers.
    // This is important in case you are working with values
    // from input text in HTML.
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    // Check the correspondence of the coordinates for latitude: North or South.
    latResult = (lat >= 0) ? 'N' : 'S';

    // Call to getDms(lat) function for the coordinates of Latitude in DMS.
    // The result is stored in latResult variable.
    latResult += this.getDms(lat);

    // Check the correspondence of the coordinates for longitude: East or West.
    lngResult = (lng >= 0) ? 'E' : 'O';

    // Call to getDms(lng) function for the coordinates of Longitude in DMS.
    // The result is stored in lngResult variable.
    lngResult += this.getDms(lng);

    // Joining both variables and separate them with a space.
    dmsResult = latResult + ' ' + lngResult;

    // Return the resultant string.
    return dmsResult;
  }

  getDms(val) {

    // Required variables
    var valDeg, valMin, valSec, result;

    // Here you'll convert the value received in the parameter to an absolute value.
    // Conversion of negative to positive.
    // In this step does not matter if it's North, South, East or West,
    // such verification was performed earlier.
    val = Math.abs(val); // -40.601203 = 40.601203

    // ---- Degrees ----
    // Stores the integer of DD for the Degrees value in DMS
    valDeg = Math.floor(val); // 40.601203 = 40

    // Add the degrees value to the result by adding the degrees symbol "º".
    result = valDeg + "º"; // 40º

    // ---- Minutes ----
    // Removing the integer of the inicial value you get the decimal portion.
    // Multiply the decimal portion by 60.
    // Math.floor returns an integer discarding the decimal portion.
    // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
    valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

    // Add minutes to the result, adding the symbol minutes "'".
    result += valMin + "'"; // 40º36'

    // ---- Seconds ----
    // To get the value in seconds is required:
    // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
    // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
    // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
    // 3º - now that you have the seconds value in decimal,
    // you need to convert it into seconds of degree.
    // To do so multiply this value (0.001203) by 3600, which is
    // the number of seconds in a degree.
    // You get 0.001203 * 3600 = 4.3308
    // As you are using the function Math.round(),
    // which rounds a value to the next unit,
    // you can control the number of decimal places
    // by multiplying by 1000 before Math.round
    // and subsequent division by 1000 after Math.round function.
    // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
    // In this case the final value will have three decimal places.
    // If you only want two decimal places
    // just replace the value 1000 by 100.
    valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331 

    // Add the seconds value to the result,
    // adding the seconds symbol " " ".
    result += valSec + '"'; // 40º36'4.331"

    // Returns the resulting string.
    return result;
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
