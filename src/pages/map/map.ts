import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
declare const BMap: any;
declare const BMAP_ANIMATION_BOUNCE: any;
import { LocationProvider } from '../../providers/location/location';

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
    public location: LocationProvider
  ) {
    this.location.locationStream.subscribe((res: any) => {
      let point = new BMap.Point(res.longitude, res.latitude);
      this.mapCtrl.panTo(point);

      var marker = new BMap.Marker(point);  // 创建标注
      this.mapCtrl.addOverlay(marker);               // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    });
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.mapCtrl = new BMap.Map(this.map.nativeElement);
    this.mapCtrl.centerAndZoom(new BMap.Point(116.404, 39.915), 18);
    this.mapCtrl.setCurrentCity("北京");
    this.mapCtrl.enableScrollWheelZoom(true);
    this.location.locationStart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  goLogin() {
    let profileModal = this.modalCtrl.create(LoginPage);
    profileModal.present();
  }

}
