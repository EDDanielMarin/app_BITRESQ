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
import { ChatRoomPageModule } from '../pages/chat-room/chat-room.module';
import { DatosPage } from '../pages/datos/datos';
const config: SocketIoConfig = { url: 'https://immense-fjord-51072.herokuapp.com', options: {} };


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
    DatosPage
  ],
  imports: [
    BrowserModule,
    ChatRoomPageModule,

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
    DatosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorProvider,
      multi: true
    },
 
    RestProvider,
    DaoProvider,
    TokenInterceptorProvider,
    Camera
  ]
})
export class AppModule {}
