import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: MainPage },
];
