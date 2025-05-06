import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../models/punto4-boleto';
import { BoletoService } from '../../services/punto4-boleto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente para mostrar la lista de boletos vendidos.
 * Muestra información detallada de cada boleto y calcula el total general.
 */
@Component({
  selector: 'app-punto4-lista-boletos',
  imports: [CommonModule, RouterModule],
  templateUrl: './punto4-lista-boletos.component.html',
  styleUrl: './punto4-lista-boletos.component.css',
  standalone: true
})
export class ListaBoletosComponent implements OnInit {
  /**
   * Obtiene el nombre de la categoría a partir del código numérico.
   * @param categoria Código numérico de la categoría (1=Menor, 2=Adulto, 3=Jubilado)
   * @returns Nombre de la categoría en formato legible
   */
  getCategoriaNombre(categoria: number): string {
    switch(Number(categoria)) {
      case 1: return 'Menor (35% desc)';
      case 2: return 'Adulto';
      case 3: return 'Jubilado (50% desc)';
      default: return 'Desconocido';
    }
  }

  /**
   * Constructor del componente.
   * @param boletoService Servicio para gestionar los boletos
   */
  constructor(public boletoService: BoletoService) {}

  /**
   * Calcula el total general de todos los boletos vendidos.
   * Suma los precios finales (con descuentos aplicados) de todos los boletos.
   * @returns El monto total de todas las ventas
   */
  get totalGeneral(): number {
    return this.boletoService.obtenerBoletos()
      .reduce((sum, b) => sum + b.precioFinal, 0);
  }

  ngOnInit() {
    console.log('Lista boletos initialized, data:', this.boletoService.obtenerBoletos());
  }
}

