import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hasPermission: boolean = true;
  constructor(
    public navCtrl: NavController,
    public notificationProvider: NotificationProvider
  ) {

  }

  test() {
    this.notificationProvider.checkPermission().subscribe(res => {
      this.hasPermission = res;
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
