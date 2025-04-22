import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Noticia {
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
}

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component {
  noticias: Noticia[] = [
    {
      titulo: 'Murió el Papa Francisco a los 88 años',
      descripcion: 'El Sumo Pontífice falleció tras sufrir un derrame cerebral seguido de un coma y colapso del sistema cardiovascular, según confirmó la Santa Sede el 21 de abril de 2025.',
      imagen: 'https://media.cnn.com/api/v1/images/stellar/prod/portada-papa.jpg?q=w_2000,c_fill/f_webp', 
      fecha: '21 de abril de 2025'
    },
    {
      titulo: 'Al menos 26 muertos en ataque insurgente en Cachemira',
      descripcion: 'Hombres armados abrieron fuego contra turistas en la Cachemira india, resultando en la muerte de al menos 26 personas y dejando 13 heridos, según informó la policía el 22 de abril de 2025.',
      imagen: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1DoVFa.img?w=768&h=518&m=6&x=900&y=333&s=104&d=80', // Reemplaza con una imagen real si la tienes
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

  indiceActual: number = 0;

  anterior(): void {
    this.indiceActual = this.indiceActual > 0 ? this.indiceActual - 1 : this.noticias.length - 1;
  }

  siguiente(): void {
    this.indiceActual = this.indiceActual < this.noticias.length - 1 ? this.indiceActual + 1 : 0;
  }

  irANoticia(indice: number): void {
    this.indiceActual = indice;
  }
}