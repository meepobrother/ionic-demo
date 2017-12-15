import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
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
    private backgroundGeolocation: BackgroundGeolocation
  ) {

  }

  locationStart() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false,
      stopOnTerminate: false,
    };
    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.location = location;
      });
    this.backgroundGeolocation.start();
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
