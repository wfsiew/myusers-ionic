import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/model';
import { Utils } from '../../helpers/utils';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage implements OnInit {

  title = 'Edit';
  mform: FormGroup;
  user: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private userProvider: UserProvider,
    private events: Events) {
    this.id = navParams.get('id');
    this.createForm();
  }

  ngOnInit() {
    this. user = this.userProvider.getUser(this.id).subscribe(k => {
      this.user = k;
    });
  }

  createForm() {
    this.mform = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  updateUser() {
    let m = this.mform.value;
    let o = new User(this.id, m.first_name, m.last_name, '');
    this.userProvider.updateUser(o).subscribe(k => {
      this.events.publish('user:updated', o);
      Utils.showToast('User has been successfully updated', this.toastCtrl);
      this.navCtrl.pop();
    });
  }
}
