import { Injectable } from '@angular/core';
declare const cordova: any;
import { Observable } from 'rxjs/Observable';
@Injectable()
export class NotificationProvider {
  hasPermission: boolean = false;
  constructor() {

  }

  checkPermission(): Observable<boolean> {
    return Observable.create(observe => {
      cordova.plugins.notification.local.hasPermission((granted) => {
        this.hasPermission = granted;
        if (!this.hasPermission) {
          cordova.plugins.notification.local.requestPermission((granted) => {
            this.hasPermission = granted;
            observe.next(this.hasPermission);
            observe.complete();
          });
        } else {
          observe.next(this.hasPermission);
          observe.complete();
        }
      });
    });
  }

  sendNotification(msg: any) {
    if (this.hasPermission) {
      cordova.plugins.notification.local.schedule(msg);
    } else {
      this.checkPermission();
    }
  }

}
