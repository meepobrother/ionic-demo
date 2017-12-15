import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginComponent } from '../../components/login/login';
import { MoreComponent } from '../../components/more/more';

declare const BMap: any;
declare const BMAP_ANIMATION_BOUNCE: any;
import { LocationProvider } from '../../providers/location/location';
import { PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') map: ElementRef;

  mapCtrl: any;
  type: string = 'tasks';
  canGoBack: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public location: LocationProvider,
    public popoverCtrl: PopoverController
  ) {

  }

  ionViewDidEnter() {
    this.canGoBack = this.navCtrl.canGoBack();
    setTimeout(() => {
      this.initMap();
    }, 300);
  }

  ionViewDidLeave() {
    this.canGoBack = true;
  }

  more(event) {
    let profileModal = this.popoverCtrl.create(MoreComponent);
    profileModal.present({
      ev: event
    });
  }

  initMap() {
    this.mapCtrl = new BMap.Map(this.map.nativeElement);
    let point = new BMap.Point(this.location.location.latitude, this.location.location.longitude);
    this.mapCtrl.centerAndZoom(point, 18);
    this.mapCtrl.enableScrollWheelZoom(true);

    this.location.locationStream.subscribe((res: any) => {
      let point = new BMap.Point(res.longitude, res.latitude);
      BMap.Convertor.translate(point, 0, (pointNew) => {
        this.mapCtrl.panTo(pointNew);
        var marker = new BMap.Marker(pointNew);
        this.mapCtrl.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      });
    });

    this.location.locationStart();
    this.location.getCurrentPosition();
    this.location.watchPosition();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  goLogin() {
    let profileModal = this.modalCtrl.create(LoginComponent);
    profileModal.present();
  }

}
