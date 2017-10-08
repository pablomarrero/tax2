import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginComponent]
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor( public authService: AuthService, private loginModal: LoginComponent, private router: Router ) { }

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
