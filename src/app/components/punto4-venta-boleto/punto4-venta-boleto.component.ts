import { Component } from '@angular/core';
import { Boleto } from '../../models/punto4-boleto';
import { BoletoService } from '../../services/punto4-boleto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Componente para la venta de boletos.
 * Permite al usuario ingresar los datos del boleto y registrarlo en el sistema.
 */
@Component({
  selector: 'app-punto4-venta-boleto',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './punto4-venta-boleto.component.html',
  styleUrl: './punto4-venta-boleto.component.css',
  standalone: true
})
export class VentaBoletoComponent {
  /**
   * Objeto boleto que se enlaza con el formulario.
   * Se inicializa con valores predeterminados.
   */
  boleto = new Boleto('', 0, 2, new Date(), '');

  /**
   * Lista de categorías de turista disponibles.
   * Cada categoría tiene un id y un nombre descriptivo que incluye información sobre descuentos.
   */
  categorias = [
    { id: 1, nombre: 'Menor (35% desc)' },
    { id: 2, nombre: 'Adulto' },
    { id: 3, nombre: 'Jubilado (50% desc)' }
  ];

  /**
   * Constructor del componente.
   * @param boletoService Servicio para gestionar los boletos
   */
  constructor(private boletoService: BoletoService) {}

  /**
   * Método para calcular el precio final del boleto.
   * Aplica los descuentos según la categoría del turista y actualiza el modelo.
   * - Menores (categoría 1): 35% de descuento
   * - Adultos (categoría 2): Sin descuento
   * - Jubilados (categoría 3): 50% de descuento
   */
  calcularPrecio(): void {
    // La lógica de cálculo está en el modelo Boleto (getter precioFinal)
    // Este método se mantiene para responder a eventos de la interfaz
    // El precio final se calcula automáticamente a través del getter en el modelo
    console.log('Categoría seleccionada:', this.boleto.categoriaTurista);
    console.log('Precio base:', this.boleto.precioBase);
    console.log('Precio final calculado:', this.boleto.precioFinal);
  }

  /**
   * Registra un nuevo boleto en el sistema.
   * Agrega el boleto actual al servicio y reinicia el formulario con valores predeterminados.
   */
  registrarBoleto(): void {
    // Aseguramos que la categoría sea un número
    const categoriaTurista = Number(this.boleto.categoriaTurista);

    // Creamos una copia del boleto actual con la categoría correcta
    const boletoParaAgregar = new Boleto(
      this.boleto.dni,
      this.boleto.precioBase,
      categoriaTurista,
      new Date(),
      this.boleto.email
    );

    // Agregamos el boleto al servicio
    this.boletoService.agregarBoleto(boletoParaAgregar);
    console.log('Boleto registrado:', boletoParaAgregar);

    // Reiniciamos el formulario
    this.boleto = new Boleto('', 0, 2, new Date(), '');
  }
}
