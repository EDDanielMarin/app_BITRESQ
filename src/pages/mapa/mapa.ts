import { Component } from '@angular/core';
import { NavController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
 

declare var cordova: any;


/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  lastImage: string = null;
  loading: Loading;
 
  constructor(public navCtrl: NavController,  
     public toastCtrl: ToastController,
      public platform: Platform, 
      public loadingCtrl: LoadingController) { }
 
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  
  
}
