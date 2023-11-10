/*  Act 4.4 Crea 5 productos y guárdalos en un array. Crea las siguientes
funciones (todas reciben ese array como parámetro): */

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
  this.toString = () =>
    `Nombre: ${this.nombre}\nCategoria: ${this.categoria}\nUnidades: ${
      this.unidades
    }\nPrecio: ${this.precio}\nImporte: ${this.importe()}`
  this.valueOf = () => this.importe()
}

const productos = [
  new Producto('TV Samsung 42', 'Televisores', 4, 345.95),
  new Producto('FIFA 23', 'Juegos', 16, 72),
  new Producto('PC', 'Tecnologia', 1, 1800),
  new Producto('Libro', 'Estudios', 20, 17),
  new Producto('Lapicero', 'Estudios', 34, 1)
]

const prodOrdenPorNombre = productos =>
  productos.sort((p1, p2) => p1.nombre.localeCompare(p2.nombre))
const prodOrdenPorPrecio = productos =>
  productos.sort((p1, p2) => p2.precio - p1.precio)

console.log(prodOrdenPorPrecio(productos))
