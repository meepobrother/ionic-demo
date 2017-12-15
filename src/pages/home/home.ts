import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { LocationProvider } from '../../providers/location/location';

import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hasPermission: boolean = true;
  location: BackgroundGeolocationResponse;
  constructor(
    public navCtrl: NavController,
    public notificationProvider: NotificationProvider,
    private locationProvider: LocationProvider
  ) { }

  goSetting() {
    this.navCtrl.push('SettingPage')
  }

  goLogin(){
    this.navCtrl.push('MapPage')
  }

  locationStart() {
    this.locationProvider.locationStart();
  }

  sendNotification() {
    this.notificationProvider.checkPermission().subscribe(res => {
      if (res) {
        this.notificationProvider.sendNotification({
          title: 'localNotifications',
          text: 'text',
          badge: 10,
          at: new Date(new Date().getTime() + 3600)
        });
      }
    });
  }

}
