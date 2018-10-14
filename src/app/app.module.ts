import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';


import { RestProvider } from '../providers/rest/rest';
import { DaoProvider } from '../providers/dao/dao';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorProvider } from '../providers/token-interceptor/token-interceptor';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { IonicStorageModule } from '../../node_modules/@ionic/storage';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
//import { ChatRoomPageModule } from '../pages/chat-room/chat-room.module';
import { DatosPage } from '../pages/datos/datos';
import { MapaPage } from '../pages/mapa/mapa';
import { ReportePage } from '../pages/reporte/reporte';

import { NativeMapPage } from '../pages/native-map/native-map';
import { NativeMapPageModule } from '../pages/native-map/native-map.module';
const config: SocketIoConfig = { url: "http://70.37.56.132:3001", options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    TabsControllerPage,
    ChatRoomPage,
    DatosPage,
    MapaPage,
    ReportePage
  ],
  imports: [
    BrowserModule,
    //ChatRoomPageModule,
    NativeMapPageModule,

    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    HomePage,
    TabsControllerPage,
    ChatRoomPage,
    DatosPage,
    MapaPage,
    ReportePage,
    NativeMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorProvider,
      multi: true
    },
 
    RestProvider,
    DaoProvider,
    TokenInterceptorProvider,
    Camera,
    Geolocation,
    GoogleMaps,
    Geocoder,
  ]
})
export class AppModule {}
