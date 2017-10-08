import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  successCallback(data: FirebaseUISignInSuccess) {
    $('#closeLoginModal').click();
    this.authService.successCallback(data);
    this.router.navigateByUrl('private');
  }

}
