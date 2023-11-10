/* Act 3.1 Crea un objeto Productos con las
propiedades y métodos del ejercicio anterior.
Además tendrá un método getInfo que devolverá:
‘Nombre (categoría): unidades uds x precio € = importe €’.
Crea 3 productos diferentes. */

function Producto(nombre, categoria, unidades, precio) {
  this.nombre = nombre
  this.categoria = categoria
  this.unidades = unidades
  this.precio = precio
  this.importe = () => this.unidades * this.precio
  this.getInfo = () =>
    `${this.nombre} (${this.categoria}): ${this.unidades} uds x ${
      this.precio
    } € = ${this.importe()} €`
}

const producto1 = new Producto('TV Samsung 42', 'Televisores', 4, 345.95)
const producto2 = new Producto('FIFA 23', 'Juegos', 16, 72)
const producto3 = new Producto('Lavadora 3000', 'Electrodomésticos', 2, 323)

console.log(
  producto1.getInfo() + '\n' + producto2.getInfo() + '\n' + producto3.getInfo()
)
