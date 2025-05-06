import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio que implementa la lógica del juego del ahorcado.
 * Gestiona el estado del juego, la selección de palabras y el procesamiento de intentos.
 * Utiliza observables para comunicar cambios de estado a los componentes.
 */
@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  // Categoría de palabras para el juego
  private categoria: string = 'Animales';

  /**
   * Banco de palabras disponibles para el juego.
   * Todas las palabras pertenecen a la categoría 'Animales'.
   */
  private palabras: string[] = [
    'elefante', 'jirafa', 'leopardo', 'rinoceronte', 'hipopotamo',
    'cocodrilo', 'pinguino', 'chimpance', 'serpiente', 'mariposa'
  ];

  // Variables de estado del juego
  /** Palabra que el jugador debe adivinar */
  private palabraSeleccionada: string = '';
  /** Representación de la palabra con guiones y letras adivinadas */
  private palabraOculta: string[] = [];
  /** Número máximo de intentos fallidos permitidos */
  private intentosMaximos: number = 6;
  /** Intentos restantes antes de perder */
  private intentosRestantes: number = this.intentosMaximos;
  /** Conjunto de todas las letras que el jugador ha intentado */
  private letrasIngresadas: Set<string> = new Set<string>();
  /** Conjunto de letras correctamente adivinadas */
  private letrasCorrectas: Set<string> = new Set<string>();
  /** Estado actual del juego: jugando, victoria o derrota */
  private estadoJuego: 'jugando' | 'victoria' | 'derrota' = 'jugando';

  // BehaviorSubjects para implementar el patrón Observable
  /** Subject para la palabra oculta (con guiones y letras adivinadas) */
  private palabraOcultaSubject = new BehaviorSubject<string[]>([]);
  /** Subject para los intentos restantes */
  private intentosRestantesSubject = new BehaviorSubject<number>(this.intentosRestantes);
  /** Subject para las letras ya ingresadas */
  private letrasIngresadasSubject = new BehaviorSubject<Set<string>>(this.letrasIngresadas);
  /** Subject para el estado del juego */
  private estadoJuegoSubject = new BehaviorSubject<'jugando' | 'victoria' | 'derrota'>(this.estadoJuego);

  /**
   * Constructor del servicio.
   * Inicia automáticamente un nuevo juego al crear una instancia.
   */
  constructor() {
    this.iniciarJuego();
  }

  // Getters para los observables (permiten a los componentes suscribirse)
  
  /**
   * Observable de la palabra oculta.
   * Los componentes pueden suscribirse para recibir actualizaciones.
   */
  get palabraOculta$(): Observable<string[]> {
    return this.palabraOcultaSubject.asObservable();
  }

  /**
   * Observable de los intentos restantes.
   * Los componentes pueden suscribirse para recibir actualizaciones.
   */
  get intentosRestantes$(): Observable<number> {
    return this.intentosRestantesSubject.asObservable();
  }

  /**
   * Observable del conjunto de letras ingresadas.
   * Los componentes pueden suscribirse para recibir actualizaciones.
   */
  get letrasIngresadas$(): Observable<Set<string>> {
    return this.letrasIngresadasSubject.asObservable();
  }

  /**
   * Observable del estado del juego.
   * Los componentes pueden suscribirse para recibir actualizaciones.
   */
  get estadoJuego$(): Observable<'jugando' | 'victoria' | 'derrota'> {
    return this.estadoJuegoSubject.asObservable();
  }

  // Métodos para acceso directo a propiedades
  
  /**
   * Obtiene la categoría actual de palabras.
   * @returns La categoría de palabras del juego.
   */
  getCategoria(): string {
    return this.categoria;
  }

  /**
   * Obtiene la palabra seleccionada para el juego actual.
   * @returns La palabra que el jugador debe adivinar.
   */
  getPalabraSeleccionada(): string {
    return this.palabraSeleccionada;
  }

  /**
   * Obtiene el número de imagen correspondiente al estado actual.
   * @returns Un número entre 0 y 6 que representa la imagen del ahorcado.
   */
  getImagenEstado(): number {
    // Devuelve un número que corresponde a la imagen según los intentos fallidos
    return this.intentosMaximos - this.intentosRestantes;
  }

  /**
   * Inicia un nuevo juego.
   * Selecciona una palabra aleatoria y reinicia todos los estados.
   */
  iniciarJuego(): void {
    // Seleccionar una palabra al azar
    this.palabraSeleccionada = this.seleccionarPalabraAleatoria();

    // Inicializar palabra oculta con guiones
    this.palabraOculta = Array(this.palabraSeleccionada.length).fill('_');

    // Reiniciar estado
    this.intentosRestantes = this.intentosMaximos;
    this.letrasIngresadas = new Set<string>();
    this.letrasCorrectas = new Set<string>();
    this.estadoJuego = 'jugando';

    // Actualizar observables
    this.actualizarObservables();

    console.log('Juego iniciado. Palabra:', this.palabraSeleccionada);
  }

  /**
   * Procesa un intento de adivinar una letra.
   * Actualiza el estado del juego según el resultado.
   * @param letra La letra que el jugador intenta adivinar.
   */
  intentarLetra(letra: string): void {
    // Convertir a minúscula para normalizar
    letra = letra.toLowerCase();

    // Verificar si el juego ya terminó o la letra ya fue ingresada
    if (this.estadoJuego !== 'jugando' || this.letrasIngresadas.has(letra)) {
      return;
    }

    // Agregar a letras ingresadas
    this.letrasIngresadas.add(letra);

    // Verificar si la letra está en la palabra
    const letraEncontrada = this.palabraSeleccionada.includes(letra);

    if (letraEncontrada) {
      // Actualizar palabra oculta con la letra encontrada
      for (let i = 0; i < this.palabraSeleccionada.length; i++) {
        if (this.palabraSeleccionada[i] === letra) {
          this.palabraOculta[i] = letra;
          this.letrasCorrectas.add(letra);
        }
      }

      // Verificar si ganó (no quedan guiones en la palabra)
      if (!this.palabraOculta.includes('_')) {
        this.estadoJuego = 'victoria';
      }
    } else {
      // Restar un intento por letra incorrecta
      this.intentosRestantes--;

      // Verificar si perdió (no quedan intentos)
      if (this.intentosRestantes <= 0) {
        this.estadoJuego = 'derrota';
        // Revelar la palabra completa
        this.palabraOculta = this.palabraSeleccionada.split('');
      }
    }

    // Actualizar observables para notificar a los componentes
    this.actualizarObservables();
  }

  /**
   * Selecciona una palabra aleatoria del banco de palabras.
   * @returns Una palabra aleatoria para el juego.
   * @private Método interno del servicio.
   */
  private seleccionarPalabraAleatoria(): string {
    const indice = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indice];
  }

  /**
   * Actualiza todos los observables con los valores actuales.
   * Notifica a los componentes suscritos sobre los cambios.
   * @private Método interno del servicio.
   */
  private actualizarObservables(): void {
    this.palabraOcultaSubject.next([...this.palabraOculta]);
    this.intentosRestantesSubject.next(this.intentosRestantes);
    this.letrasIngresadasSubject.next(new Set(this.letrasIngresadas));
    this.estadoJuegoSubject.next(this.estadoJuego);
  }
}
