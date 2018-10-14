import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReportePage } from '../reporte/reporte';
import { ChatRoomPage } from '../chat-room/chat-room';
import { DatosPage } from '../datos/datos';
import { MapaPage } from '../mapa/mapa';
import { NativeMapPage } from '../native-map/native-map';

/**
 * Generated class for the TabsControllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html',
})
export class TabsControllerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  tab1Root: any = DatosPage;
  tab2Root: any = ChatRoomPage;
  tab3Root: any = ReportePage;
  tab4Root: any = NativeMapPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsControllerPage');
  }

}
