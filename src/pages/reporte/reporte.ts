import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, FabContainer } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';



import { Storage } from "@ionic/storage";
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { DatosPage } from '../datos/datos';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';


declare var cordova: any;


@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html',
})
export class ReportePage implements OnInit {

  myForm: FormGroup;

  image: string = null;
  imageURI: any;
  imageFileName: any;
  usuario: any = {}
  mision: any = {}
  data: any = null;
  msg: String = ''
  mediaFiles = [];
  video: any = null
  triaje: any
  rescatista: any = {}
  cat: string = "men"; // default button

  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private file: File,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private _storage: Storage,
    private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController,
    private mediaCapture: MediaCapture,
    public formBuilder: FormBuilder,
    private rest: RestProvider,

  ) {
  }

  ngOnInit(): void {
    this.inicializaForm()
  }
  ionViewDidLoad() {
    this._storage.get('user').then((resp) => {
      this.usuario = resp
      this._storage.get('mision').then((respm) => {
        this.mision = respm
        this.rest.ejecutaGet('rescatistas/cedula/' + resp.rescatista).subscribe((resc: any) => {
          this.rescatista = resc
          this.cargarTriaje()

        })


      })
    })
  }

  inicializaForm() {
    this.myForm = this.formBuilder.group({
      reanimacion: ['', Validators.required],
      emergencia: ['', Validators.required],
      urg: ['', Validators.required],
      menosurg: ['', Validators.required],
      nourg: ['', Validators.required],

    });
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar imagen',
      buttons: [
        {
          text: 'Usar biblioteca',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Tomar nueva',
          handler: () => {
            this.getImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  atras(fab: FabContainer) {
    fab.close();
  }

  getImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      // destinationType: this.camera.DestinationType.DATA_URL,
      //encodingType: this.camera.EncodingType.,

      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true

    }
    let path
    let filename
    this.camera.getPicture(options).then((imageData) => {
      this.data = imageData
      filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      filename = filename.split('?')[0]
      this.file.readAsDataURL(path, filename).then(result => {
        this.image = result;
      }, (err) => {
        alert(JSON.stringify(err))
      });
    }, (err) => {
      this.presentToast("Error al obtener la fotografía");
    });
  }
  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      this.data = capturedFile.fullPath;
      //this.uploadImage()
      /*
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');      
      var toDirectory = this.file.dataDirectory;

      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
       // this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
        let path = this.file.dataDirectory + fileName;
        let url = path.replace(/^file:\/\//, '');
        let video = this.myVideo.nativeElement;
        video.src = url;
        video.play();
    },err => {
       alert(JSON.stringify(err));
      });

    */
    },
      (err: CaptureError) => alert(JSON.stringify(err)));
  }


  uploadImage() {
    if (this.msg == '')
      return
    let loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let d = new Date()
    let s = JSON.stringify(this.data).split('.')
    let pos = s[s.length - 1].split('?')[0]

    let url = 'http://70.37.56.132:3000/archivos/upload/' + this.mision.codigo + '/' + this.usuario.rescatista + '/' + this.msg
    url = url.replace(/ /g, '%20')
    let options1: FileUploadOptions = {
      fileKey: 'file',
      fileName: d.getTime() + '_report.' + pos,
      headers: {}
    }
    fileTransfer.upload(this.data, url, options1)
      .then((data) => {
        // success
        loader.dismiss();
        this.presentToast("Reporte enviado correctamente");
        this.video = null
        this.image = null
        this.msg = ''
        this.data = null


      }, (err) => {
        // error
        loader.dismiss();
        this.presentToast("Ha ocurrido un error al subir la imagen");
      });

  }


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
  inicio() {
    this.navCtrl.setRoot(DatosPage)
  }

  cargarTriaje() {
    this.rest.ejecutaGet('registros/registrotipo/' + this.mision.codigo + '/' + this.rescatista.codigo + '/5').subscribe((resp: any) => {
      this.triaje = resp
      if(resp[0])
        this.myForm.setValue(resp[0].contenido)
      else
      this.inicializaForm()
    })
  }

  enviarDatosTriaje() {

    if (!this.triaje[0]) {
      let data: any = {}
      data.contenido = this.myForm.value
      data.rescatista = this.usuario.rescatista
      data.mision = this.mision.codigo
      data.tipo = 5
      data.fecha = new Date()

      this.rest.ejecutaPut('registros/', data).subscribe(
        (resp) => {
          this.presentToast("Reporte enviado correctamente");
        //  this.inicializaForm()

        },
        err => {
          this.presentToast("Error al enviar reporte");

        }
      )
    }
    else{
      let data: any = {}
      data=this.triaje[0]
      delete data['contenido']
      data.contenido=this.myForm.value.value

      this.rest.ejecutaPost('registros/',data).subscribe((resp)=>{
        this.presentToast("Reporte enviado correctamente");

        console.log(resp)
      })
    }

  }

}
