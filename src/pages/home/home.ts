import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { LocationProvider } from '../../providers/location/location';
import { PopoverController, ModalController } from 'ionic-angular';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { LoginComponent } from '../../components/login/login';
import { MoreComponent } from '../../components/more/more';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hasPermission: boolean = true;
  location: BackgroundGeolocationResponse;
  canGoBack: boolean = false;
  constructor(
    public navCtrl: NavController,
    public notificationProvider: NotificationProvider,
    private locationProvider: LocationProvider,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidEnter() {
    this.canGoBack = this.navCtrl.canGoBack();
  }

  goSetting() {
    this.navCtrl.push('SettingPage')
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

  more(event) {
    let profileModal = this.popoverCtrl.create(MoreComponent);
    profileModal.present({
      ev: event
    });
  }

  goLogin() {
    let profileModal = this.modalCtrl.create(LoginComponent);
    profileModal.present();
  }

}
