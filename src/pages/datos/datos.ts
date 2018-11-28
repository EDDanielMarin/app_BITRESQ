import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { BackgroundGeolocation, BackgroundGeolocationResponse, BackgroundGeolocationConfig } from '../../../node_modules/@ionic-native/background-geolocation';
import { Storage } from "@ionic/storage";
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup } from '@angular/forms';

declare var google;


@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html',
})
export class DatosPage {
  myForm: FormGroup;

  mision: any = {}
  lat;
  long;
  ubicacion
  distancia: any
  altura: any = "Calculando..."
  elevator: any
  altObj: any = {}
  data: any = {}
  usuario: any = {}

  logs: string[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    private backgroundGeolocation: BackgroundGeolocation,
    private _storage: Storage,
    private rest: RestProvider,


  ) {



  }

  ionViewDidLoad() {
    this.elevator = new google.maps.ElevationService;
    this._storage.get('user').then((resp) => {
      this.usuario = resp
      this._storage.get('mision').then((respm) => {
        this.mision=respm
      })
      this.startBackgroundGeolocation()
    })


    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => this.getPosition(),
          error => {
            this.getPosition(),
              this.showToast(error)
          }
        );
      }

    });
    this.getPosition()

  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then(response => {

        this.lat = response.coords.latitude
        this.long = response.coords.longitude
        this.altura = response.coords.altitude
        this.ubicacion=this.rest.ddToDms(this.lat, this.long)
        var la1 = -0.315885
        var lo1 = -78.4427159
        this.distancia = this.getKilometros(la1, lo1, this.lat, this.long)
        this.lat = this.lat.toFixed(3)
        this.long = this.long.toFixed(3)
        var locations = new google.maps.LatLng(this.lat, this.long)

        this.elevator.getElevationForLocations({ 'locations': [locations] }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              console.log(results[0])
              this.altura = (results[0].elevation)
              this.altura = this.altura.toFixed(3)

            } else {
              console.log('No results found');
            }
          } else {
            console.log('Elevation service failed due to: ' + status);
          }
        }


        );
        /*  setTimeout(() => {    //<<<---    using ()=> syntax
            this.displayLocationElevation(position, elevator)
          }, 3000);
  
  */

      })
      .catch(error => {
        console.log(error);
      })
  }



  getKilometros = function (lat1, lon1, lat2, lon2) {
    var rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales
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
      //debug: true,
      stopOnTerminate: true,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 1000,
      fastestInterval: 500,
      activitiesInterval: 1000,
    };

    console.log('start');

    this.backgroundGeolocation
      .configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
        this.logs.push(`${location.latitude},${location.longitude}`);

        this.enviarPosicion(location)


      });

    // start recording location
    this.backgroundGeolocation.start();

  }
  cargaTest() {
  
    this.data.contenido.latitud = this.lat
    this.data.contenido.longitud = this.long
    this.data.rescatista = this.usuario.rescatista
    this.data.mision = this.mision.codigo
    this.data.tipo = 4
    this.data.fecha = new Date()

    this.rest.ejecutaPut('registros/', this.data).subscribe(
      (resp) => {
        alert(JSON.stringify(resp))
      }
    )

  }
  enviarPosicion(location) {
    this.getPosition()
    this.data.contenido = {}
    this.data.contenido.latitud = location.latitude
    this.data.contenido.longitud = location.longitude
    this.data.rescatista = this.usuario.rescatista
    this.data.mision = this.mision.codigo
    this.data.tipo = 2
    this.data.fecha = new Date()
    this.rest.ejecutaPut('registros/', this.data).subscribe(
      (resp) => {
        console.log(resp)
      }
    )
  }





  /*\
{
	"codigo":1,
"fecha": ISODate("2018-07-09T23:41:49.575+0000"),
	"mision": 1,
	"usuario": 1,
	"contenido": {
		{OBJETO MULTIMEDIA}
	}

  */


}
