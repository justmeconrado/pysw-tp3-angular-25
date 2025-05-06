import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';
import { Punto3Component } from './components/punto3/punto3.component';
import { VentaBoletoComponent } from './components/punto4-venta-boleto/punto4-venta-boleto.component';
import { ListaBoletosComponent } from './components/punto4-lista-boletos/punto4-lista-boletos.component';



export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'punto1', component: Punto1Component },
  { path: 'punto2', component: Punto2Component },
  { path: 'punto3', component: Punto3Component },
  { path: 'punto4', component: VentaBoletoComponent },
  { path: 'punto4-lista', component: ListaBoletosComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: 'home' } // Ruta comodín (404)
];

