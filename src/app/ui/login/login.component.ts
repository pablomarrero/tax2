import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AppComponent ) { }

  ngOnInit() {
  }

  successCallback(data: FirebaseUISignInSuccess) {
    $('#closeLoginModal').click();
    this.auth.successCallback(data);
  }

}
