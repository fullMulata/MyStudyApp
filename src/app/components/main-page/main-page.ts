import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuHeader } from '../menu-header/menu-header';

@Component({
  selector: 'app-main-page',
  imports: [
    MenuHeader
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {

}
