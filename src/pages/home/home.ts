import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { LocationProvider } from '../../providers/location/location';
import { PopoverController, ModalController } from 'ionic-angular';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { LoginComponent } from '../../components/login/login';
import { MoreComponent } from '../../components/more/more';

import { CallNumber } from '@ionic-native/call-number';
import { CardIO } from '@ionic-native/card-io';

import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SMS } from '@ionic-native/sms';

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
    public modalCtrl: ModalController,
    public callNumber: CallNumber,
    private cardIO: CardIO,
    private qq: QQSDK,
    public qrScanner: QRScanner,
    private sms: SMS
  ) {

  }

  sendSms() {
    this.sms.send('13140415408', 'Hello world!');
  }

  doQrScanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
          this.qrScanner.show();
        } else if (status.denied) {

        } else {

        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  shareText() {
    const shareTextOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      text: 'This is Share Text',
      scene: this.qq.Scene.QQ,
    };
    this.qq.shareText(shareTextOptions)
      .then(() => {
        console.log('shareText success');
      })
      .catch(error => {
        console.log(error);
      });
  }

  scanCard() {
    this.cardIO.canScan()
      .then(
      (res: boolean) => {
        if (res) {
          let options = {
            requireExpiry: true,
            requireCVV: false,
            requirePostalCode: false
          };
          this.cardIO.scan(options);
        }
      }
      );
  }

  doCallNumber() {
    this.callNumber.callNumber("18001010101", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
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
