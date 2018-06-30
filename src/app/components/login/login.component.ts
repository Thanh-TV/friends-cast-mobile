import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user = {
  }

  constructor(public viewController: ViewController) {}

  ngOnInit() {
  }

  txtModalKeyUp(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
      $(event.target).parents('.modal').find('button.btn-process').click();
    }
  }

  closeModal() {
    this.viewController.dismiss();
  }
}
