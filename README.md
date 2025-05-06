# Myapp - Proyecto Angular TP3

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.7.

## Punto 1: Descripción del Proyecto

Este proyecto es un trabajo práctico desarrollado en Angular que implementa diferentes funcionalidades distribuidas en módulos independientes:

- **Carrusel de Noticias**: Componente que muestra noticias con imágenes en formato carrusel.
- **Catálogo de Productos**: Tienda virtual con productos tecnológicos y carrito de compras.
- **Juego del Ahorcado**: Implementación interactiva del clásico juego.
- **Sistema de Venta de Boletos**: Gestión completa de boletos con diferentes categorías de turista y descuentos.

## Punto 2: Tecnologías Utilizadas

- Angular 19
- TypeScript
- HTML5/CSS3
- RxJS para programación reactiva
- LocalStorage para persistencia de datos
- Bootstrap para componentes de UI
- Angular Router para navegación entre componentes

## Punto 3: Estructura del Proyecto

### Componentes

#### Componentes Principales
- **AppComponent**: Componente raíz que integra el header, footer y el router-outlet.
- **HeaderComponent**: Barra de navegación superior con enlaces a todas las secciones.
- **FooterComponent**: Pie de página con información de contacto y enlaces.
- **HomeComponent**: Página principal con introducción al proyecto.

#### Módulo Punto 1: Carrusel de Noticias
- **Punto1Component**: Implementa un carrusel de noticias con imágenes, títulos y descripciones.
  - Características: Navegación entre noticias, visualización de fecha y descripción.

#### Módulo Punto 2: Catálogo de Productos
- **Punto2Component**: Muestra un catálogo de productos tecnológicos con funcionalidad de carrito de compras.
  - Características: Agregar/eliminar productos, modificar cantidades, calcular total.

#### Módulo Punto 3: Juego del Ahorcado
- **Punto3Component**: Implementa el juego del ahorcado con interfaz gráfica.
  - Características: Selección aleatoria de palabras, control de intentos, visualización del estado del juego.

#### Módulo Punto 4: Sistema de Venta de Boletos
- **VentaBoletoComponent**: Formulario para registrar nuevos boletos con validación de datos.
  - Características: Selección de categoría de turista, cálculo automático de descuentos.
- **ListaBoletosComponent**: Visualización y gestión de boletos registrados.
  - Características: Filtrado, edición, eliminación y estadísticas de boletos.

### Servicios

- **AhorcadoService**: Gestiona la lógica del juego del ahorcado.
  - Funcionalidades: Selección de palabras, verificación de letras, control del estado del juego.
- **BoletoService**: Administra los boletos de viaje.
  - Funcionalidades: CRUD de boletos, persistencia en localStorage, cálculo de estadísticas.

### Modelos

- **Boleto**: Modelo para representar boletos de viaje.
  - Propiedades: DNI, precio base, categoría de turista, fecha de compra, email.
  - Métodos: Cálculo de precio final con descuentos según categoría.

## Punto 4: Instalación y Configuración

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio del proyecto
cd pysw-tp3-angular-25

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

## Uso y Ejemplos

### Navegación

La aplicación cuenta con una barra de navegación que permite acceder a los diferentes módulos:

- **Home**: Página principal
- **Punto 1**: Carrusel de noticias
- **Punto 2**: Catálogo de productos
- **Punto 3**: Juego del ahorcado
- **Punto 4**: Sistema de venta de boletos

### Juego del Ahorcado

1. Navegar a la sección "Punto 3"
2. El juego seleccionará aleatoriamente una palabra de la categoría "Animales"
3. Hacer clic en las letras para intentar adivinar la palabra
4. Se dispone de 6 intentos antes de perder

### Sistema de Venta de Boletos

1. Navegar a la sección "Punto 4"
2. Completar el formulario con los datos del pasajero
3. Seleccionar la categoría de turista (Menor, Adulto o Jubilado)
4. El sistema calculará automáticamente el precio final con los descuentos aplicables
5. Para ver los boletos registrados, hacer clic en "Ver Boletos"

## Development server

Para iniciar el servidor de desarrollo, ejecute:

```bash
ng serve
```

Una vez que el servidor esté en ejecución, abra su navegador y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifique cualquiera de los archivos fuente.

## Code scaffolding

Angular CLI incluye potentes herramientas de scaffolding. Para generar un nuevo componente, ejecute:

```bash
ng generate component component-name
```

Para una lista completa de esquemas disponibles (como `components`, `directives`, o `pipes`), ejecute:

```bash
ng generate --help
```

## Building

Para construir el proyecto ejecute:

```bash
ng build
```

Esto compilará su proyecto y almacenará los artefactos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza su aplicación para rendimiento y velocidad.

## Running unit tests

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), use el siguiente comando:

```bash
ng test
```

## Running end-to-end tests

Para pruebas end-to-end (e2e), ejecute:

```bash
ng e2e
```

Angular CLI no incluye un framework de pruebas end-to-end por defecto. Puede elegir uno que se adapte a sus necesidades.

## Additional Resources

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visite la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
