import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { RestProvider } from '../providers/rest/rest';
import { DaoProvider } from '../providers/dao/dao';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorProvider } from '../providers/token-interceptor/token-interceptor';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { IonicStorageModule } from '../../node_modules/@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    HomePage
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
    TokenInterceptorProvider
  ]
})
export class AppModule {}
