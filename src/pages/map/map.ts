import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
declare const BMap: any;

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {
  @ViewChild('map') map: ElementRef;

  mapCtrl: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private geolocation: Geolocation
  ) {

  }

  ngOnInit() {
    this.initMap();
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let point = new BMap.Point(resp.coords.latitude, resp.coords.longitude);
      this.mapCtrl.panTo(point);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  initMap() {
    this.mapCtrl = new BMap.Map(this.map.nativeElement);
    this.mapCtrl.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    this.mapCtrl.setCurrentCity("北京");
    this.mapCtrl.enableScrollWheelZoom(true);
    this.getCurrentPosition();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  goLogin() {
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }

}
