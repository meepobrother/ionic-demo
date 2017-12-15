import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare const cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hasPermission: boolean = true;
  constructor(
    public navCtrl: NavController
  ) {

  }

  test() {
    cordova.plugins.notification.local.hasPermission((granted) => {
      this.hasPermission = granted;
      if (!this.hasPermission) {
        cordova.plugins.notification.local.requestPermission(function (granted) {
          this.hasPermission = granted;
        });
      }
      if(this.hasPermission){
        this.send();
      }
    });
  }

  send() {
    cordova.plugins.notification.local.schedule({
      title: 'localNotifications',
      text: 'text',
      badge: 10,
      at: new Date(new Date().getTime() + 3600)
    });
  }

}
