import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardComponent } from '../dashboard/dashboard.component';

declare var firebase:any;
declare var window:any;
declare var $:any;

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
  currentUser:any;

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
    var self = this;
    self.currentUser = firebase.auth().currentUser;
    if(!self.currentUser) {
      setTimeout(function() {
        self.currentUser = firebase.auth().currentUser;
        if (!self.currentUser || (self.currentUser && self.currentUser.emailVerified)) {
          self.navCtrl.push(DashboardComponent);
        }
      }, 500);
    }
  }

  btnVerifyClick(event) {
    var self = this;
    $(event.target).addClass('btn-loading');
    self.currentUser.sendEmailVerification().then((res) => {
      window.showSuccess('Succeeded! Please check your email to continue.');
      $(event.target).removeClass('btn-loading');
    }).catch((error) => {
      $(event.target).removeClass('btn-loading');
      window.showError(error.message);
    });
  }
}
