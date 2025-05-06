/**
 * Clase que representa un boleto de viaje con diferentes categorías de turista.
 * Implementa lógica para calcular el precio final según descuentos por categoría.
 */
export class Boleto {
  /**
   * Constructor para crear una nueva instancia de Boleto.
   * @param dni Documento Nacional de Identidad del pasajero.
   * @param precioBase Precio base del boleto sin descuentos aplicados.
   * @param categoriaTurista Categoría del turista: 1=Menor, 2=Adulto, 3=Jubilado.
   * @param fechaCompra Fecha en que se realizó la compra del boleto.
   * @param email Correo electrónico del pasajero para contacto.
   * @param id Identificador único del boleto (opcional).
   */
  constructor(
    public dni: string,
    public precioBase: number,
    public categoriaTurista: number, // 1=Menor, 2=Adulto, 3=Jubilado
    public fechaCompra: Date,
    public email: string,
    public id?: number
  ) {}

  /**
   * Calcula el precio final del boleto aplicando descuentos según la categoría del turista.
   * - Menores (categoría 1): 35% de descuento
   * - Adultos (categoría 2): Sin descuento
   * - Jubilados (categoría 3): 50% de descuento
   *
   * @returns El precio final después de aplicar los descuentos correspondientes.
   */
  get precioFinal(): number {
    // Aseguramos que categoriaTurista sea tratado como número
    const categoria = Number(this.categoriaTurista);

    switch(categoria) {
      case 1: return this.precioBase * 0.65;  // 35% desc
      case 3: return this.precioBase * 0.5;   // 50% desc
      default: return this.precioBase;        // Sin descuento
    }
  }
}
