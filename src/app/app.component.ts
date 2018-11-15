import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';
import { MapaPage } from '../pages/mapa/mapa';
import { NativeMapPage } from '../pages/native-map/native-map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,  
    private storage: Storage) {
    let tk=localStorage.getItem('jwt')
    this.initializeApp();
    if(tk)
        this.rootPage=HomePage
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HomePage', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }
  cerrarSesion()
  {
    this.storage.clear()
    localStorage.clear()
    this.nav.setRoot(LoginPage)
    
  }
  goToInicio()
  {
    this.nav.setRoot(HomePage)
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  gotoMap()
  {
   // this.nav.setRoot(MapaPage);
    this.nav.setRoot(NativeMapPage);

  }
  mapaNativo()
  {
    this.nav.setRoot(NativeMapPage);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
