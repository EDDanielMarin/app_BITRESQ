import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReportePage } from '../reporte/reporte';
import { UbicacionPage } from '../ubicacion/ubicacion';
import { ChatRoomPage } from '../chat-room/chat-room';
import { DatosPage } from '../datos/datos';

/**
 * Generated class for the TabsControllerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html',
})
export class TabsControllerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  tab1Root: any = DatosPage;
  tab2Root: any = ChatRoomPage;
  tab3Root: any = UbicacionPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsControllerPage');
  }

}
