import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html',
})
export class DatosPage {

  mision:any={}
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.mision = this.navParams.get('mision');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPage');
  }

}
