import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class LocationProvider {
  locationStream: Subject<BackgroundGeolocationResponse> = new Subject();
  location: any;
  header: HttpHeaders = new HttpHeaders();
  constructor(
    public backgroundGeolocation: BackgroundGeolocation,
    public http: HttpClient
  ) {
    console.log('Hello LocationProvider Provider');
    this.header.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  }

  locationStart(): Subject<BackgroundGeolocationResponse> {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false,
      stopOnTerminate: false,
    };
    this.backgroundGeolocation.start();
    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      this.location = location;
      this.uploadLocation();
      this.locationStream.next(this.location);
    });
    return this.locationStream;
  }

  uploadLocation() {
    this.location = this.location || { msg: 'test' }
    this.http.post("https://meepo.com.cn/test.php", this.location, { headers: this.header }).subscribe(res => {
      console.log(res);
    });
  }

  locationEnd() {
    this.backgroundGeolocation.stop();
  }

}
