import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @interface Noticia
 * @description Define la estructura de los datos para cada noticia.
 */
interface Noticia {
  titulo: string;     // Título de la noticia.
  descripcion: string; // Descripción o cuerpo de la noticia.
  imagen: string;    // URL de la imagen asociada a la noticia.
  fecha: string;     // Fecha de la noticia.
}

/**
 * @Component
 * @description Decorador que marca la clase como un componente de Angular.
 */
@Component({
  selector: 'app-punto1',         // Selector CSS para usar el componente en las plantillas HTML.
  standalone: true,             // Indica que el componente es independiente y no requiere un NgModule.
  imports: [CommonModule],        // Importa CommonModule para usar directivas comunes como *ngIf y *ngFor.
  templateUrl: './punto1.component.html', // Ruta al archivo HTML de la plantilla del componente.
  styleUrls: ['./punto1.component.css']  // Ruta al archivo CSS de los estilos del componente.
})
/**
 * @class Punto1Component
 * @description Define la lógica del componente que muestra un carrusel de noticias.
 */
export class Punto1Component {
  /**
   * @property noticias
   * @type {Noticia[]}
   * @description Arreglo de noticias que se mostrarán en el componente. Cada objeto dentro del arreglo corresponde a una noticia con su título, descripción, imagen y fecha.
   */
  noticias: Noticia[] = [
    {
      titulo: 'Murió el Papa Francisco a los 88 años',
      descripcion:
        'El Sumo Pontífice falleció tras sufrir un derrame cerebral seguido de un coma y colapso del sistema cardiovascular, según confirmó la Santa Sede el 21 de abril de 2025.',
      imagen: 'https://media.cnn.com/api/v1/images/stellar/prod/portada-papa.jpg?q=w_2000,c_fill/f_webp',
      fecha: '21 de abril de 2025',
    },
    {
      titulo: 'Al menos 26 muertos en ataque insurgente en Cachemira',
      descripcion:
        'Hombres armados abrieron fuego contra turistas en la Cachemira india, resultando en la muerte de al menos 26 personas y dejando 13 heridos, según informó la policía el 22 de abril de 2025.',
      imagen: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1DoVFa.img?w=768&h=518&m=6&x=900&y=333&s=104&d=80',
      fecha: '22 de abril de 2025'
    },
    {
      titulo: 'La Provincia atenderá teleconsultas por Sarampión',
      descripcion: 'El Ministerio de Salud de la Provincia de Buenos Aires anunció la implementación de teleconsultas para personas con síntomas de Sarampión, con el objetivo de evitar la circulación y prevenir brotes. Hasta el 22 de abril de 2025, se aplicaron casi 20.000 dosis de la vacuna.',
      imagen: 'https://www.gba.gob.ar/sites/default/files/salud/imagenes/WhatsApp%20Image%202025-04-22%20at%2009.07.14.jpeg', 
      fecha: '22 de abril de 2025'
    },    
    {
      titulo: 'Máximo esplendor de la lluvia de meteoros Líridas',
      descripcion: 'La lluvia de meteoros Líridas alcanzará su máximo esplendor entre la noche del 21 y la madrugada del 22 de abril de 2025. El radiante se encuentra en la constelación de Lira, cerca de la estrella Vega.',
      imagen: 'https://www.infobae.com/resizer/v2/D3OR62KRQC5GAB32WYNEVGWHCM.jpg?auth=3c635c1f193557fdbb9d6ac63d228c54c75bf3f503d850101907ed61c73ac091&smart=true&width=992&height=661&quality=85', 
      fecha: '22 de abril de 2025'
    },
    {
      titulo: 'Comienza la preinscripción al Examen de Ingreso a Residencias 2025 en Argentina',
      descripcion: 'El Ministerio de Salud de Argentina anunció el inicio de la preinscripción al Examen de Ingreso a Residencias 2025 a través del sistema SISA, a partir del 21 de abril de 2025.',
      imagen: 'https://www.gba.gob.ar/sites/default/files/salud/imagenes/RESIDENCIAS%202024%201_0.jpg', 
      fecha: '21 de abril de 2025'
    }
  ];

  /**
   * @property indiceActual
   * @type {number}
   * @description Índice de la noticia actualmente mostrada en el carrusel.
   */
  indiceActual: number = 0;

  /**
   * @method anterior
   * @description Muestra la noticia anterior en el carrusel. Si está en la primera noticia, va a la última.
   * @returns {void}
   */
  anterior(): void {
    this.indiceActual = this.indiceActual > 0 ? this.indiceActual - 1 : this.noticias.length - 1;
  }

  /**
   * @method siguiente
   * @description Muestra la siguiente noticia en el carrusel. Si está en la última noticia, vuelve a la primera.
   * @returns {void}
   */
  siguiente(): void {
    this.indiceActual = this.indiceActual < this.noticias.length - 1 ? this.indiceActual + 1 : 0;
  }

  /**
   * @method irANoticia
   * @description Cambia la noticia que se muestra actualmente a la especificada por el índice.
   * @param {number} indice - El índice de la noticia a mostrar.
   */
  irANoticia(indice: number): void {
    this.indiceActual = indice;
  }
}