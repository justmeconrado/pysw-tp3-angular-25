import { Component } from '@angular/core';
import { AhorcadoService } from './punto3.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente que implementa el juego del ahorcado.
 * Utiliza el servicio AhorcadoService para la lógica del juego.
 * Implementa las interfaces OnInit y OnDestroy para gestionar el ciclo de vida.
 */
@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true
})
export class Punto3Component implements OnInit, OnDestroy {
  /**
   * Array que representa la palabra a adivinar con guiones y letras descubiertas.
   * Cada posición contiene una letra o un guion bajo '_'.
   */
  palabraOculta: string[] = [];

  /**
   * Número de intentos fallidos permitidos antes de perder.
   * Se inicializa a 0 y se actualiza desde el servicio.
   */
  intentosRestantes: number = 0;

  /**
   * Conjunto de letras que el usuario ya ha intentado.
   * Permite verificar rápidamente si una letra ya fue utilizada.
   */
  letrasIngresadas: Set<string> = new Set<string>();

  /**
   * Estado actual del juego.
   * Puede ser 'jugando', 'victoria' o 'derrota'.
   */
  estadoJuego: 'jugando' | 'victoria' | 'derrota' = 'jugando';

  /**
   * Array con todas las letras del alfabeto para mostrar los botones.
   * Se genera dividiendo una cadena con todas las letras.
   */
  alfabeto: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  /**
   * Array para almacenar todas las suscripciones a observables.
   * Se utiliza para facilitar la limpieza en ngOnDestroy.
   * @private Solo se usa internamente en el componente.
   */
  private suscripciones: Subscription[] = [];

  /**
   * Variable para almacenar la letra ingresada manualmente por el usuario.
   * Se enlaza con un campo de entrada en el formulario.
   */
  letraActual: string = '';

  /**
   * Controla la visibilidad del modal de victoria.
   * Se activa cuando el jugador adivina la palabra completa.
   */
  mostrarModalVictoria: boolean = false;

  /**
   * Controla la visibilidad del modal de derrota.
   * Se activa cuando el jugador agota todos sus intentos.
   */
  mostrarModalDerrota: boolean = false;

  /**
   * Constructor del componente.
   * @param ahorcadoService Servicio que contiene la lógica del juego.
   */
  constructor(public ahorcadoService: AhorcadoService) { }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones a los observables del servicio.
   */
  ngOnInit(): void {
    // Suscripción al observable de la palabra oculta
    this.suscripciones.push(
      this.ahorcadoService.palabraOculta$.subscribe(
        palabra => this.palabraOculta = palabra
      )
    );

    // Suscripción al observable de intentos restantes
    this.suscripciones.push(
      this.ahorcadoService.intentosRestantes$.subscribe(
        intentos => this.intentosRestantes = intentos
      )
    );

    // Suscripción al observable de letras ingresadas
    this.suscripciones.push(
      this.ahorcadoService.letrasIngresadas$.subscribe(
        letras => this.letrasIngresadas = letras
      )
    );

    // Suscripción al observable del estado del juego
    this.suscripciones.push(
      this.ahorcadoService.estadoJuego$.subscribe(
        estado => {
          this.estadoJuego = estado;

          // Mostrar modales según el resultado del juego
          if (estado === 'victoria') {
            this.mostrarModalVictoria = true;
          } else if (estado === 'derrota') {
            this.mostrarModalDerrota = true;
          }
        }
      )
    );
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    // Cancelar todas las suscripciones almacenadas
    this.suscripciones.forEach(sub => sub.unsubscribe());
  }

  /**
   * Procesa el intento de adivinar una letra.
   * Delega la lógica al servicio AhorcadoService.
   * @param letra La letra que el jugador intenta adivinar.
   */
  intentarLetra(letra: string): void {
    this.ahorcadoService.intentarLetra(letra);
  }

  /**
   * Procesa el intento de adivinar la letra ingresada en el campo de texto.
   * Verifica que sea un solo carácter antes de procesarla.
   */
  intentarLetraInput(): void {
    if (this.letraActual && this.letraActual.length === 1) {
      this.ahorcadoService.intentarLetra(this.letraActual);
      this.letraActual = ''; // Limpia el campo después de procesar
    }
  }

  /**
   * Reinicia el juego para comenzar una nueva partida.
   * Oculta los modales de resultado y solicita un nuevo juego al servicio.
   */
  reiniciarJuego(): void {
    this.mostrarModalVictoria = false;
    this.mostrarModalDerrota = false;
    this.ahorcadoService.iniciarJuego();
  }

  /**
   * Verifica si una letra ya ha sido utilizada en el juego actual.
   * @param letra La letra a verificar.
   * @returns true si la letra ya fue ingresada, false en caso contrario.
   */
  letraYaIngresada(letra: string): boolean {
    return this.letrasIngresadas.has(letra);
  }

  /**
   * Obtiene la ruta de la imagen que representa el estado actual del ahorcado.
   * @returns La ruta de la imagen correspondiente al número de intentos fallidos.
   */
  getImagenSrc(): string {
    const estado = this.ahorcadoService.getImagenEstado();
    return `img/estado${estado}.png`;
  }
}
