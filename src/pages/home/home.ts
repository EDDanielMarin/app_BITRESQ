import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationResponse, BackgroundGeolocationConfig } from '../../../node_modules/@ionic-native/background-geolocation';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from "@ionic/storage";
import { TabsControllerPage } from '../tabs-controller/tabs-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logs: string[] = [];
  misiones: any[] = []
  usuario: any = {}
  nickname = '';




  constructor(public navCtrl: NavController,
    private backgroundGeolocation: BackgroundGeolocation,
    private rest: RestProvider,
    private _storage: Storage) {
    this._storage.get('user').then((resp) => {
      this.usuario=resp
      //optener mision
      this.cargarMisiones()
    })




  }


  cargarMisiones() {
   /* this.rest.ejecutaGet('operaciones/usuario/'.concat(this.usuario.codigo)).subscribe(*/
    this.rest.ejecutaGet('misiones').subscribe(
      (resp) => {
        console.log(resp)
        this.misiones = resp
      }
    )
  }

  misionStart(e)
  {
    console.log(e)
    this.navCtrl.setRoot(TabsControllerPage,{ mision: e })

  }
  ionViewDidLoad() {
  }


  //-------------------------------------------------------------

  startBackgroundGeolocation() {
    this.backgroundGeolocation.isLocationEnabled()
      .then((rta) => {
        if (rta) {
          this.start();
        } else {
          this.backgroundGeolocation.showLocationSettings();
        }
      })
  }

  stopBackgroundGeolocation() {
    this.backgroundGeolocation.stop();
  }
  start() {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 6000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
    };

    console.log('start');

    this.backgroundGeolocation
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
        this.logs.push(`${location.latitude},${location.longitude}`);
      });

    // start recording location
    this.backgroundGeolocation.start();

  }

}
