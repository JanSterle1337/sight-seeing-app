import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home, [cl-home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'cl-home' }
})
export class HomeComponent {

  mainHeader: string = "Slovenian castle locator";

  constructor() { }
}
