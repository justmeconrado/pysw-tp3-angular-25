import { Component, OnInit } from '@angular/core';
import { Boleto } from '../../models/punto4-boleto';
import { BoletoService } from '../../services/punto4-boleto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

declare var bootstrap: any;

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
export class VentaBoletoComponent implements OnInit {
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
  /**
   * Modal para confirmación de registro
   */
  private confirmacionModal: any;

  constructor(private boletoService: BoletoService, private router: Router) { }

  /**
   * Inicializa el componente y configura el modal
   */
  ngOnInit() {
    // Inicializar modal después de que el DOM esté listo
    setTimeout(() => {
      this.confirmacionModal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    }, 0);
  }

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
   * Obtiene el porcentaje de descuento según la categoría del turista.
   * @returns El porcentaje de descuento aplicado
   */
  getDescuentoPorcentaje(): number {
    const categoria = Number(this.boleto.categoriaTurista);
    switch (categoria) {
      case 1: return 35;  // 35% descuento para menores
      case 3: return 50;  // 50% descuento para jubilados
      default: return 0;  // Sin descuento para adultos
    }
  }

  /**
   * Obtiene el texto descriptivo de la categoría seleccionada.
   * @returns Nombre de la categoría en formato legible
   */
  getCategoriaTexto(): string {
    const categoria = Number(this.boleto.categoriaTurista);
    switch (categoria) {
      case 1: return 'Menor (35% desc)';
      case 2: return 'Adulto';
      case 3: return 'Jubilado (50% desc)';
      default: return 'Desconocido';
    }
  }

  /**
   * Calcula el monto del descuento aplicado al precio base.
   * @returns El monto del descuento
   */
  getDescuentoMonto(): number {
    return this.boleto.precioBase - this.boleto.precioFinal;
  }

  /**
   * Registra un nuevo boleto en el sistema.
   * Agrega el boleto actual al servicio y muestra un modal de confirmación.
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

    // Guardamos los datos actuales para mostrarlos en el modal
    const datosActuales = { ...this.boleto };

    // Reiniciamos el formulario para futuras entradas
    this.reiniciarFormulario();

    // Restauramos temporalmente los datos para mostrarlos en el modal
    this.boleto = new Boleto(
      datosActuales.dni,
      datosActuales.precioBase,
      Number(datosActuales.categoriaTurista),
      new Date(),
      datosActuales.email
    );

    // Mostramos el modal de confirmación
    this.confirmacionModal.show();

    // Configuramos un evento para reiniciar el formulario cuando se cierre el modal
    const modalElement = document.getElementById('confirmacionModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.reiniciarFormulario();
      }, { once: true });
    }
  }

  /**
   * Reinicia el formulario con valores predeterminados
   */
  reiniciarFormulario(): void {
    this.boleto = new Boleto('', 0, 2, new Date(), '');
  }

  /**
   * Oculta el modal de confirmación y navega a la lista de boletos.
   */
  verListaDeBoletos(): void {
    if (this.confirmacionModal) {
      this.confirmacionModal.hide();
    }
    // Esperar a que el modal se oculte completamente antes de navegar
    const modalElement = document.getElementById('confirmacionModal');
    if (modalElement) {
      // Asegurarse de que el listener se añade solo una vez o se limpia
      const navigateToList = () => {
        this.router.navigate(['/punto4-lista']);
        modalElement.removeEventListener('hidden.bs.modal', navigateToList);
      };
      modalElement.addEventListener('hidden.bs.modal', navigateToList, { once: true });

      // Si el modal no está visible, navegar inmediatamente
      if (!modalElement.classList.contains('show')) {
        this.router.navigate(['/punto4-lista']);
      }
    } else {
      // Si el elemento modal no existe, navegar directamente
      this.router.navigate(['/punto4-lista']);
    }
  }
}
