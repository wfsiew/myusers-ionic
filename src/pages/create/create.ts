import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/model';
import { Utils } from '../../helpers/utils';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  title = 'Create';
  mform: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private userProvider: UserProvider,
    private events: Events) {
    this.createForm();
  }

  createForm() {
    this.mform = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  createUser() {
    let m = this.mform.value;
    let o = new User(0, m.first_name, m.last_name, '');
    this.userProvider.createUser(o).subscribe(k => {
      this.events.publish('user:updated', o);
      Utils.showToast('User has been successfully created', this.toastCtrl);
      this.navCtrl.pop();
    });
  }
}
