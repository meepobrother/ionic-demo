import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginComponent {

  constructor(
    params: NavParams,
    public loginProvider: LoginProvider,
    public viewCtrl: ViewController
  ) {
    this.loginProvider.loginStream.subscribe(res => {
      this.close(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log('登陆');
    this.loginProvider.login();
  }

  close(data: any) {
    this.viewCtrl.dismiss(data);
  }

}
