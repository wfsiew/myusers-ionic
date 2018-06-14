import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CreatePage } from '../create/create';
import { DetailPage } from '../detail/detail';
import { Utils } from '../../helpers/utils';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  
  title = 'Users';
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private events: Events) {
    this.events.subscribe('user:updated', (o) => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let loading = Utils.getLoading(this.loadingCtrl);
    this.userProvider.getUsers().subscribe(k => {
      this.users = k;
      loading.dismiss();
    })
  }

  createUser() {
    this.navCtrl.push(CreatePage);
  }

  itemTapped(event, user) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetailPage, {
      id: user.id
    });
  }

  refresh() {
    this.getUsers();
  }
}
