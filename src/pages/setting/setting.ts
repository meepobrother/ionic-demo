import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { LocationProvider } from '../../providers/location/location';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  // 地理位置
  location: any;
  // 設置保存
  setting: any = {
    notification: false,
    location: false
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationProvider: NotificationProvider,
    public locationProvider: LocationProvider,
    public store: Storage
  ) {
    this.locationProvider.locationStream.subscribe(res => {
      this.location = res;
    });
    this.store.get('setting').then(setting => {
      if (setting) {
        this.setting = {
          ...this.setting,
          ...setting
        }
      }
    });
    this.locationProvider.uploadLocation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  onLocationChange(e: any) {
    if (e) {
      this.locationProvider.locationStart().subscribe(res => {
        this.notificationProvider.send('系统设置', '成功打开位置监控');
      });
    } else {
      this.locationProvider.locationEnd();
      this.notificationProvider.send('系统设置', '成功关闭位置监控');
    }
    this.store.set('setting', this.setting);
  }

  onNotificationChange(e: any) {
    if (e) {
      this.notificationProvider.checkPermission().subscribe(res => {
        // 注册推送通知
      });
    } else {
      this.notificationProvider.clearAll();
    }
    this.store.set('setting', this.setting);
  }

}
