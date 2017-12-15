import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';
import { ModalController } from 'ionic-angular';
@Injectable()
export class LoginProvider {
  isLogin: boolean = false;
  loginStream: Subject<boolean> = new Subject();
  constructor(
    public http: HttpClient,
    public store: Storage,
    public modalCtrl: ModalController
  ) {

  }

  checkLogin() {
    this.store.get('isLogin').then(login => {
      if (login) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  login() {
    this.store.set('isLogin', true).then(res => {
      this.isLogin = true;
      console.log(this.isLogin);
      this.loginStream.next(this.isLogin);
    });
  }

  logout() {
    this.store.set('isLogin', false).then(res => {
      this.isLogin = false;
      this.loginStream.next(this.isLogin);
    });
  }

}
