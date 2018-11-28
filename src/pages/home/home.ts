import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from "@ionic/storage";
import { TabsControllerPage } from '../tabs-controller/tabs-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  misiones: any[] = []
  usuario: any = {}





  constructor(public navCtrl: NavController,
    private rest: RestProvider,
    private _storage: Storage,

  ) {
    this._storage.get('user').then((resp) => {
      this.usuario=resp
      //optener mision
      this.cargarMisiones()
    })




  }


  cargarMisiones() {
   this.rest.ejecutaGet('operaciones/rescatista/'.concat(this.usuario.rescatista)).subscribe(
   // this.rest.ejecutaGet('misiones').subscribe(
      (resp) => {
        console.log(resp)
        this.misiones = resp
      }
    )
  }
 
  misionStart(e)
  {
    this._storage.set('mision', e);
    this.navCtrl.setRoot(TabsControllerPage)

  }
  ionViewDidLoad() {
  }


}
