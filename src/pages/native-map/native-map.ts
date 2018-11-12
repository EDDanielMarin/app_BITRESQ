import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  Marker,
  GeocoderRequest,
  GeocoderResult,
  GoogleMapOptions,
} from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the NativeMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-native-map',
  templateUrl: 'native-map.html',
})
export class NativeMapPage {
  map: GoogleMap;
  posiciones: any = []
  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private socket: Socket,

  ) {

    this.getPosicionRescatista().subscribe((pos: any) => {
      var tempPos = this.posiciones.find(x => x.rescatista == pos.rescatista && x.mision==pos.mision)
      var index = this.posiciones.indexOf(tempPos)
      if (index > -1) {
        this.posiciones.splice(index, 1);
      }

      this.posiciones.push(pos)
      console.log(this.posiciones)
      this.dibujarMarcadores()

    });



  }
  dibujarMarcadores()
  {
    
    this.map.clear()
    this.getPosition()
    this.posiciones.forEach(x => {
      this.addMarker(x)
      
    });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'Mi Posición',
          icon: 'blue',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }



  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.contenido.latitud, options.contenido.longitud),
      title: options.remisor,
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }

  //-------


  getPosicionRescatista() {
    let observable = new Observable(observer => {
      this.socket.on('registro_2', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

}