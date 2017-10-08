import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/theme.scss']
})
export class AppComponent implements OnInit {
  title = 'TaxiGO';

  constructor() {
  }

  ngOnInit(): void {
  }

}
