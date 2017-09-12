import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginComponent]
})
export class HeaderComponent implements OnInit {

  constructor( private auth: AppComponent, private loginModal: LoginComponent ) { }

  ngOnInit() {
  }

}
