import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { NotificationProvider } from '../providers/notification/notification';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationProvider } from '../providers/location/location';
import { IonicStorageModule, StorageConfig } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from '../providers/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { ComponentsModule } from '../components/components.module';
import { AppProvider } from '../providers/app/app';
import { CallNumber } from '@ionic-native/call-number';
import { CardIO } from '@ionic-native/card-io';
import { QQSDK } from '@ionic-native/qqsdk';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SMS } from '@ionic-native/sms';

export const config: StorageConfig = {
  name: 'runner'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(config),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NotificationProvider,
    BackgroundGeolocation,
    LocationProvider,
    LoginProvider,
    Geolocation,
    AppProvider,
    CallNumber,
    CardIO,
    QQSDK,
    QRScanner,
    SMS
  ]
})
export class AppModule { }
