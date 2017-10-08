import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.user = angularFireAuth.authState;
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }



  logout() {
    return this.angularFireAuth.auth.signOut()
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  isAuthenticated() {
    return this.user
    .map(
      (user) => {
        if (user == null) {
          return false;
        } else {
          return true;
        }
      }
    );
  }

  displayUser() {
    return this.user
    .map(
      (user) => {
        return user ? user.displayName : user.email;
      }
    );
  }

  currentUser() {
    return this.user;
  }

}
