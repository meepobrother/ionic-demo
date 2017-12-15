import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocationProvider {
  locationStream: Subject<BackgroundGeolocationResponse> = new Subject();
  location: any = {
    latitude: 116.404,
    longitude: 39.915
  };
  header: HttpHeaders = new HttpHeaders();
  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    public http: HttpClient,
    private geolocation: Geolocation,
    public store: Storage
  ) {
    this.header.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    this.store.get('myLocation').then(position => {
      if (position) {
        this.location = location;
      }
    });
    this.locationStream.subscribe(location => {
      this.store.set('myLocation', location);
    });
  }

  locationStart(): Subject<BackgroundGeolocationResponse> {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 3,
      debug: false,
      stopOnTerminate: false,
    };
    this.backgroundGeolocation.start();
    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      this.location = location;
      this.uploadLocation();
      this.locationStream.next(this.location);
    });
    setTimeout(() => {
      this.locationStream.next(this.location);
    }, 300);
    return this.locationStream;
  }

  uploadLocation() {
    this.http.post("https://meepo.com.cn/test.php", this.location, { headers: this.header }).subscribe(res => {
      console.log(res);
    });
  }

  locationEnd() {
    this.backgroundGeolocation.stop();
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let position: any = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
      this.locationStream.next(position);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  watchPosition() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      let position: any = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };
      this.locationStream.next(position);
    });
  }
}
