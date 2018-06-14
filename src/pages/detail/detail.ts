import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Utils } from '../../helpers/utils';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {

  title = 'Detail';
  user: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private userProvider: UserProvider,
    private events: Events) {
    this.id = navParams.get('id');
  }

  ngOnInit() {
    let loading = Utils.getLoading(this.loadingCtrl);
    this.user = this.userProvider.getUser(this.id).subscribe(k => {
      this.user = k;
      loading.dismiss();
    });
  }

  edit() {
    this.navCtrl.push(EditPage, {
      id: this.id
    });
  }

  delete() {
    let cfm = this.alertCtrl.create({
      title: '',
      message: 'Are you sure to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            let x = cfm.dismiss();
            this.userProvider.deleteUser(this.id).subscribe(k => {
              this.events.publish('user:updated', this.id);
              x.then(() => {
                this.navCtrl.pop();
              });
            });

            return false;
          }
        }
      ]
    });
    cfm.present();
  }
}
