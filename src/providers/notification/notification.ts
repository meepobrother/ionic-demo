import { Injectable } from '@angular/core';
declare const cordova: any;
import { Subject } from 'rxjs/Subject';
@Injectable()
export class NotificationProvider {
  hasPermission: boolean = false;

  msgStream: Subject<any> = new Subject();
  checkStream: Subject<boolean> = new Subject();
  constructor() {
    this.msgStream.subscribe(msg => {
      this.sendNotification(msg);
    });
  }

  checkPermission(): Subject<boolean> {
    cordova.plugins.notification.local.hasPermission((granted) => {
      this.hasPermission = granted;
      if (!this.hasPermission) {
        cordova.plugins.notification.local.requestPermission((granted) => {
          this.hasPermission = granted;
          this.checkStream.next(this.hasPermission);
          this.checkStream.complete();
        });
      } else {
        this.checkStream.next(this.hasPermission);
        this.checkStream.complete();
      }
    });
    return this.checkStream;
  }

  sendNotification(msg: any) {
    if (this.hasPermission) {
      cordova.plugins.notification.local.schedule(msg);
    } else {
      this.checkPermission();
    }
  }


  send(title: string, text: string) {
    this.msgStream.next({
      title: title,
      text: text,
      trigger: {
        at: new Date()
      }
    });
  }

  clearAll() {
    cordova.plugins.notification.local.clearAll();
  }

}
