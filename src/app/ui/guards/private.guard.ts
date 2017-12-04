import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class PrivateGuard implements CanActivate {
  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.authService.currentUser()
              .take(1)
              .map(user => !!user)
              .do(loggedIn => {
                if (!loggedIn) {
                  console.log('access denied');
                  this.router.navigate(['/']);
                }
              });
  }
}
