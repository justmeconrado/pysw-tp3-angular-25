import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'punto1', component: Punto1Component },
  { path: 'punto2', component: Punto2Component },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: 'home' } // Ruta comodín (404)
];
