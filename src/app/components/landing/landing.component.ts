import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  constructor(private _modalCtrl: ModalController) {}

  ngOnInit() {
  }

  btnSignUpClick() {
    let signupModal = this._modalCtrl.create(SignupComponent);
    signupModal.onDidDismiss(data => {
     debugger;
    });
    signupModal.present();
  }

  btnLoginClick() {
    let loginModal = this._modalCtrl.create(LoginComponent);
    loginModal.onDidDismiss(data => {
     debugger;
    });
    loginModal.present();
  }
}
