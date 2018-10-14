import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  image: string = null;
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportePage');
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }


}
