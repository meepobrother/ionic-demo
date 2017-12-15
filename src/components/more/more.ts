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
    console.log('Hello MoreComponent Component');
    this.text = 'Hello World';
  }

  goHome() {
    this.navCtrl.pop().then(res => {
      this.navCtrl.push(HomePage);
    }).catch(err => {
      console.log(err);
    });
  }

  goMap() {
    this.navCtrl.pop().then(res => {
      this.navCtrl.push('MapPage');
    }).catch(err => {
      console.log(err);
    });
  }

}
