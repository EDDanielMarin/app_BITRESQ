import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { Storage } from "@ionic/storage";
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage {

  image: string = null;
  imageURI: any;
  imageFileName: any;
  usuario: any = {}
  mision: any = {}
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private _storage: Storage,
    private rest: RestProvider,


  ) {
  }

  ionViewDidLoad() {
    this._storage.get('user').then((resp) => {
      this.usuario = resp
      this._storage.get('mision').then((respm) => {
        this.mision = respm
      })
    })
  }

  /*
    getImage() {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    
      this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
      }, (err) => {
        console.log(err);
        this.presentToast(err);
      });
    }
    
    uploadFile() {
      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
    
      let options: FileUploadOptions = {
        fileKey: this.mision.codigo+'_'+this.usuario.rescatista,
        fileName:  this.mision.codigo+'_'+this.usuario.rescatista,
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
    
      fileTransfer.upload(this.imageURI, 'http://70.37.56.132:3000/archivos/upload/'+this.mision.codigo+'/'+this.usuario.rescatista, options)
        .then((data) => {
        console.log(data+" Uploaded Successfully");
        this.imageFileName =  'http://70.37.56.132:3000/archivos/upload/'+this.mision.codigo+'/'+this.usuario.rescatista+'.jpg'
        loader.dismiss();
        this.presentToast("Image uploaded successfully");
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
    }
  */
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  tomarFoto() {
    let base64ImageData;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      base64ImageData = 'data:image/jpeg;base64,' + imageData;
    }, (error) => {
      console.log('Error Occured: ' + error);
    });
  }





  getPicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA

    }
    this.camera.getPicture(options)
      .then(imageData => {
        this.image = `data:image/jpeg;base64,${imageData}`;

        let input = new FormData();
        input.append('file', this.image);

        this.rest.uploadFile('archivos/upload/' + this.mision.codigo 
        + '/' + this.usuario.rescatista, input).subscribe(
          (resp) => {
            alert('ok')
          },
          err => {
            alert('error')
          }
        )
      })
      .catch(error => {
        console.error(error);
      });
  }


}
