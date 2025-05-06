import { Injectable } from '@angular/core';
import { Boleto } from '../models/punto4-boleto';

/**
 * Servicio para la gestión de boletos de viaje.
 * Proporciona funcionalidades para agregar, consultar y obtener estadísticas de boletos.
 * Implementa persistencia de datos mediante localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  /**
   * Colección de boletos almacenados en memoria.
   * @private
   */
  private boletos: Boleto[] = [];

  constructor() {
    this.cargarBoletos();
  }

  /**
   * Carga los boletos desde localStorage al iniciar el servicio
   */
  private cargarBoletos(): void {
    const boletosGuardados = localStorage.getItem('boletos');
    if (boletosGuardados) {
      try {
        const boletosData = JSON.parse(boletosGuardados);
        this.boletos = boletosData.map((b: any) => {
          // Convertir fechas de string a Date
          return new Boleto(
            b.dni,
            b.precioBase,
            Number(b.categoriaTurista),
            new Date(b.fechaCompra),
            b.email,
            b.id
          );
        });
        console.log('Boletos cargados desde localStorage:', this.boletos);
      } catch (error) {
        console.error('Error al cargar boletos:', error);
        this.boletos = [];
      }
    }
  }

  /**
   * Guarda los boletos en localStorage
   */
  private guardarBoletos(): void {
    localStorage.setItem('boletos', JSON.stringify(this.boletos));
  }

  /**
   * Agrega un nuevo boleto a la colección.
   * Asigna automáticamente un ID único al boleto antes de agregarlo.
   * Persiste los cambios en localStorage.
   *
   * @param boleto El objeto Boleto a agregar
   */
  agregarBoleto(boleto: Boleto): void {
    boleto.id = this.generarId();
    this.boletos.push(boleto);
    this.guardarBoletos();
  }

  /**
   * Obtiene una copia de todos los boletos almacenados.
   * Retorna una copia para evitar modificaciones accidentales de la colección original.
   *
   * @returns Array con todos los boletos registrados
   */
  obtenerBoletos(): Boleto[] {
    console.log('Current boletos:', this.boletos);
    return [...this.boletos];
  }

  /**
   * Genera un resumen de ventas por categoría de turista.
   * Calcula el total de ventas para cada categoría (Menor, Adulto, Jubilado).
   *
   * @returns Array de objetos con el nombre de la categoría y el total de ventas
   */
  obtenerResumen(): { categoria: string, total: number }[] {
    return [
      { categoria: 'Menor', total: this.calcularTotal(1) },
      { categoria: 'Adulto', total: this.calcularTotal(2) },
      { categoria: 'Jubilado', total: this.calcularTotal(3) }
    ];
  }

  /**
   * Elimina un boleto por su ID y persiste los cambios
   * @param id ID del boleto a eliminar
   */
  eliminarBoleto(id: number): void {
    this.boletos = this.boletos.filter(b => b.id !== id);
    this.guardarBoletos();
  }

  /**
   * Actualiza un boleto existente y persiste los cambios
   * @param boleto Boleto con los datos actualizados
   */
  actualizarBoleto(boleto: Boleto): void {
    const index = this.boletos.findIndex(b => b.id === boleto.id);
    if (index !== -1) {
      this.boletos[index] = boleto;
      this.guardarBoletos();
    }
  }

  /**
   * Calcula el total de ventas para una categoría específica.
   * Filtra los boletos por categoría y suma sus precios finales.
   *
   * @param categoria El código de categoría (1=Menor, 2=Adulto, 3=Jubilado)
   * @returns El monto total de ventas para la categoría especificada
   * @private Método interno del servicio
   */
  private calcularTotal(categoria: number): number {
    return this.boletos
      .filter(b => b.categoriaTurista === categoria)
      .reduce((sum, b) => sum + b.precioFinal, 0);
  }

  /**
   * Genera un ID único para un nuevo boleto.
   * Si existen boletos, toma el ID máximo y le suma 1.
   * Si no hay boletos, comienza con el ID 1.
   *
   * @returns Un número entero único para usar como ID
   * @private Método interno del servicio
   */
  private generarId(): number {
    return this.boletos.length > 0
      ? Math.max(...this.boletos.map(b => b.id || 0)) + 1
      : 1;
  }
}
