import { Component, OnInit, ViewChild } from '@angular/core';
import { Boleto } from '../../models/punto4-boleto';
import { BoletoService } from '../../services/punto4-boleto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

declare var bootstrap: any;

/**
 * Componente para mostrar la lista de boletos vendidos.
 * Muestra información detallada de cada boleto y calcula el total general.
 * Implementa funcionalidades CRUD completas.
 */
@Component({
  selector: 'app-punto4-lista-boletos',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './punto4-lista-boletos.component.html',
  styleUrl: './punto4-lista-boletos.component.css',
  standalone: true
})
export class ListaBoletosComponent implements OnInit {
  /**
   * Referencia al formulario de edición para validación
   */
  @ViewChild('editForm') editForm!: NgForm;

  /**
   * Lista de boletos filtrados para mostrar en la tabla
   */
  boletosFiltrados: Boleto[] = [];

  /**
   * Boleto seleccionado para editar o eliminar
   */
  boletoSeleccionado: Boleto | null = null;

  /**
   * Filtro de DNI para búsqueda
   */
  filtroDni: string = '';

  /**
   * Modal para eliminar boletos
   */
  private eliminarModal: any;

  /**
   * Modal para editar boletos
   */
  private editarModal: any;

  /**
   * Constructor del componente.
   * @param boletoService Servicio para gestionar los boletos
   */
  constructor(public boletoService: BoletoService) { }

  /**
   * Inicializa el componente, carga los boletos y configura los modales
   */
  ngOnInit() {
    console.log('Lista boletos initialized, data:', this.boletoService.obtenerBoletos());
    this.boletosFiltrados = this.boletoService.obtenerBoletos();

    // Inicializar modales después de que el DOM esté listo
    setTimeout(() => {
      this.eliminarModal = new bootstrap.Modal(document.getElementById('eliminarModal'));
      this.editarModal = new bootstrap.Modal(document.getElementById('editarModal'));
    }, 0);
  }

  /**
   * Aplica el filtro de DNI a la lista de boletos
   */
  aplicarFiltro(): void {
    if (!this.filtroDni.trim()) {
      this.boletosFiltrados = this.boletoService.obtenerBoletos();
    } else {
      this.boletosFiltrados = this.boletoService.obtenerBoletos()
        .filter(b => b.dni.includes(this.filtroDni.trim()));
    }
  }

  /**
   * Obtiene el nombre de la categoría a partir del código numérico.
   * @param categoria Código numérico de la categoría (1=Menor, 2=Adulto, 3=Jubilado)
   * @returns Nombre de la categoría en formato legible
   */
  getCategoriaNombre(categoria: number): string {
    switch (Number(categoria)) {
      case 1: return 'Menor (35% desc)';
      case 2: return 'Adulto';
      case 3: return 'Jubilado (50% desc)';
      default: return 'Desconocido';
    }
  }

  /**
   * Calcula el total general de todos los boletos vendidos.
   * Suma los precios finales (con descuentos aplicados) de todos los boletos.
   * @returns El monto total de todas las ventas
   */
  get totalGeneral(): number {
    return this.boletoService.obtenerBoletos()
      .reduce((sum, b) => sum + b.precioFinal, 0);
  }

  /**
   * Obtiene el total de ventas para una categoría específica
   * @param categoria Código de categoría (1=Menor, 2=Adulto, 3=Jubilado)
   * @returns Total de ventas para la categoría
   */
  getTotalPorCategoria(categoria: number): number {
    return this.boletoService.obtenerBoletos()
      .filter(b => Number(b.categoriaTurista) === categoria)
      .reduce((sum, b) => sum + b.precioFinal, 0);
  }

  /**
   * Abre el modal de confirmación para eliminar un boleto
   * @param boleto Boleto a eliminar
   */
  confirmarEliminar(boleto: Boleto): void {
    this.boletoSeleccionado = boleto;
    this.eliminarModal.show();
  }

  /**
   * Elimina el boleto seleccionado
   */
  eliminarBoleto(): void {
    if (this.boletoSeleccionado && this.boletoSeleccionado.id) {
      this.boletoService.eliminarBoleto(this.boletoSeleccionado.id);
      this.boletosFiltrados = this.boletoService.obtenerBoletos();
      this.boletoSeleccionado = null;
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop')?.remove();
    }
  }

  /**
   * Abre el modal para editar un boleto
   * @param boleto Boleto a editar
   */
  editarBoleto(boleto: Boleto): void {
    // Crear una copia para no modificar el original directamente
    this.boletoSeleccionado = new Boleto(
      boleto.dni,
      boleto.precioBase,
      boleto.categoriaTurista,
      new Date(boleto.fechaCompra),
      boleto.email,
      boleto.id
    );
    this.editarModal.show();
  }

  /**
   * Actualiza el precio final del boleto en edición
   */
  actualizarPrecioFinal(): void {
    // No es necesario hacer nada aquí, ya que el precio final
    // se calcula automáticamente mediante el getter en el modelo Boleto
    console.log('Precio actualizado:', this.boletoSeleccionado?.precioFinal);
  }

  /**
   * Guarda los cambios realizados en el boleto en edición
   */
  guardarCambios(): void {
    if (this.boletoSeleccionado && this.boletoSeleccionado.id) {
      this.boletoService.actualizarBoleto(this.boletoSeleccionado);
      this.boletosFiltrados = this.boletoService.obtenerBoletos();
      this.boletoSeleccionado = null;
    }
  }
}

