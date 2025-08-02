import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPage } from './components/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MainPage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'studychill';
}
