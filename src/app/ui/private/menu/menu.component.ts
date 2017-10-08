import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isAuthenticated = false;

  constructor(public authService: AuthService, public router: Router) { }

  onLogout() {
    this.authService.logout()
    .then(() => this.router.navigate(['/home']));
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated) => this.isAuthenticated = isAuthenticated
    );
  }



}
