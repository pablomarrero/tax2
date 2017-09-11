import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TaxiGO';
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => {
      console.log(d);
      this.user = d;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log(data);
  }

  displayUser(){
    return this.user ? this.user.displayName ? this.user.displayName : this.user.email : '';
  }

  currentUser(){
    return this.user;
  }
}
