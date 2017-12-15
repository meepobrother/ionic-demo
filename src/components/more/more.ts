import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class MoreComponent {

  text: string;
  constructor(
    public navCtrl: NavController
  ) {
    this.text = 'Hello World';
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

  goMap() {
    this.navCtrl.push('MapPage');
  }

}
