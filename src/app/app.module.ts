import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { NotificationProvider } from '../providers/notification/notification';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationProvider } from '../providers/location/location';
import { IonicStorageModule, StorageConfig } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from '../providers/login/login';
import { Geolocation } from '@ionic-native/geolocation';


let config: StorageConfig = {
  name: 'runner',
  driverOrder: ['indexeddb', 'sqlite', 'websql']
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(config),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotificationProvider,
    BackgroundGeolocation,
    LocationProvider,
    LoginProvider,
    Geolocation
  ]
})
export class AppModule { }
