import { Injectable } from '@angular/core';
import { RestProvider } from '../rest/rest';

/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {

  constructor(public _rest: RestProvider) {
    console.log('Hello DaoProvider Provider');
  }

}
