import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { NgClass } from '@angular/common';

/**
 * Componente para mostrar un catálogo de productos y un carrito de compras.
 * Permite agregar, eliminar y modificar la cantidad de productos en el carrito.
 */
@Component({
  selector: 'app-punto2', // Selector CSS para usar este componente
  imports: [CommonModule], // Módulos necesarios importados
  templateUrl: './punto2.component.html', // Ruta al archivo de plantilla HTML
  styleUrl: './punto2.component.css', // Ruta al archivo de estilos CSS
  providers: [CurrencyPipe], // Proveedores de servicios, como CurrencyPipe para formatear moneda
})
export class Punto2Component {

  /**
   * Array que contiene la lista de productos disponibles en la tienda.
   * Cada producto es un objeto con nombre, descripción, ruta de imagen y precio.
   */
  productos = [
    {
      nombre: 'Notebook Asus ZenBook 14',
      descripcion:
        'Procesador Intel Core i7, 16GB RAM, SSD 512GB, Pantalla Full HD 14 pulgadas',
        img: 'img/Notebook Asus ZenBook 14.png',      precio: 1750000,
    },
    {
      nombre: 'Monitor LG UltraWide 34',
      descripcion:
        'Resolución 3440x1440, Tecnología IPS, Frecuencia de actualización 75Hz, HDR10',
      img: 'img/Monitor LG UltraWide 34.png',
      precio: 950000,
    },
    {
      nombre: 'Smartphone Samsung Galaxy S22',
      descripcion:
        'Pantalla Dynamic AMOLED 2X de 6.6", Procesador Exynos 2200, Cámara principal de 108MP, 8GB RAM',
      img: 'img/Smartphone Samsung Galaxy S22.png', precio: 2400000,
    },
    {
      nombre: 'TV Samsung QLED 65"',
      descripcion:
        'Resolución 4K, Quantum HDR, Procesador Quantum 8K, Tecnología Ambient Mode+',
      img: 'img/TV Samsung QLED 65.png',
      precio: 3800000,
    },
    {
      nombre: 'Cámara Sony Alpha 7 IV',
      descripcion:
        'Sensor Exmor RS de 33MP, Enfoque automático híbrido, Grabación de video 4K a 120fps, Estabilización de imagen de 5 ejes',
      img: 'img/Cámara Sony Alpha 7 IV.png',
      precio: 5500000,
    },
    {
      nombre: 'Consola Sony PlayStation 5',
      descripcion:
        'Procesador AMD Ryzen Zen 2 de 8 núcleos, Gráficos AMD RDNA 2, SSD de 825GB, Soporte para Ray Tracing',
      img: 'img/Consola Sony PlayStation 5.png',
      precio: 1800000,
    },
  ];

  /**
   * Formatea un número como moneda en pesos argentinos (ARS).
   * @param precio El número a formatear.
   * @returns El precio formateado como string (ej: "$ 1.750.000,00").
   */
  formatearPrecio(precio: number): string {
    // Utiliza la API Intl.NumberFormat a través de toLocaleString para el formato de moneda local
    return precio.toLocaleString('es-AR', {
      style: 'currency', // Especifica que el formato es de moneda
      currency: 'ARS',   // Define la moneda como pesos argentinos
    });
  }

  /**
   * Array que representa el carrito de compras.
   * Contiene objetos de producto con una propiedad adicional 'cantidad'.
   */
  carrito: any[] = []; // Inicializa el carrito como un array vacío

  /**
   * Agrega un producto al carrito o incrementa su cantidad si ya existe.
   * @param producto El objeto del producto a agregar.
   */
  agregarAlCarrito(producto: any) {
    // Busca si el producto ya está en el carrito comparando por nombre
    const productoEnCarrito = this.carrito.find(
      (item) => item.nombre === producto.nombre
    );

    if (!productoEnCarrito) {
      // Si el producto no está en el carrito, lo agrega con cantidad 1
      // Se usa el spread operator (...) para crear una copia del producto y añadir la propiedad cantidad
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      // Si el producto ya está, simplemente incrementa su cantidad
      productoEnCarrito.cantidad += 1;
    }
  }

  /**
   * Elimina un producto del carrito basado en su índice.
   * @param index El índice del producto a eliminar en el array del carrito.
   */
  eliminarDelCarrito(index: number) {
    // Utiliza splice para remover 1 elemento en la posición 'index'
    this.carrito.splice(index, 1);
  }

  /**
   * Incrementa la cantidad de un producto en el carrito.
   * @param index El índice del producto en el carrito cuya cantidad se aumentará.
   */
  aumentarCantidad(index: number) {
    // Accede al producto por su índice y aumenta la propiedad 'cantidad'
    this.carrito[index].cantidad += 1;
  }

  /**
   * Disminuye la cantidad de un producto en el carrito.
   * Si la cantidad llega a 1 y se disminuye, el producto se elimina del carrito.
   * @param index El índice del producto en el carrito cuya cantidad se disminuirá.
   */
  disminuirCantidad(index: number) {
    if (this.carrito[index].cantidad > 1) {
      // Si la cantidad es mayor que 1, simplemente la disminuye
      this.carrito[index].cantidad -= 1;
    } else {
      // Si la cantidad es 1, llama a eliminarDelCarrito para quitar el producto
      this.eliminarDelCarrito(index);
    }
  }

  /**
   * Calcula el precio total de todos los productos en el carrito.
   * Tiene en cuenta el precio de cada producto y su cantidad.
   * @returns El monto total del carrito como número.
   */
  calcularTotal(): number {
    // Utiliza reduce para sumar los subtotales de cada producto (precio * cantidad)
    // El '|| 1' asegura que si 'cantidad' es undefined o 0, se use 1 (aunque no debería pasar con la lógica actual)
    return this.carrito.reduce((total, producto) => total + producto.precio * (producto.cantidad || 1), 0);
  }
}
