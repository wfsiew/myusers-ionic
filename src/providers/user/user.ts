import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../../models/model';
import { Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  baseuri = 'https://reqres.in';

  constructor(public http: HttpClient,
    private platform: Platform,
    private androidPermissions: AndroidPermissions) {
    if (this.platform.is('core') === false) {
      this.checkPermissions();
    }
  }

  checkPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
      result => {
        if (result.hasPermission === false) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET);
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
    );

    //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.INTERNET]);
  }

  createUser(o: User) {
    const uri = `${this.baseuri}/api/users`;
    const k = {
      name: `${o.first_name} ${o.last_name}`,
      job: 'doctor'
    };
    return this.http.post(uri, k);
  }

  getUsers() {
    const uri = `${this.baseuri}/api/users?per_page=50`;
    return this.http.get(uri).pipe(map(k => {
      return k['data'];
    }));
  }

  getUser(id) {
    const uri = `${this.baseuri}/api/users/${id}`;
    return this.http.get(uri).pipe(map(k => {
      return k['data'];
    }));
  }

  updateUser(o: User) {
    const uri = `${this.baseuri}/api/users/${o.id}`;
    const k = {
      name: `${o.first_name} ${o.last_name}`,
      job: 'bitch'
    };
    return this.http.put(uri, k);
  }

  deleteUser(id) {
    const uri = `${this.baseuri}/api/users/${id}`;
    return this.http.delete(uri);
  }
}
