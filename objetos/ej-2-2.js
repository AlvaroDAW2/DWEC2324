/*  Act 4.2 Modifica los Objetos Productos y Televisores, para que contenga
 la función ”valueOf”. Esta función debe devolver un valor
 numérico(El que consideres oportuno). */

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

function Televisores(nombre, categoria, unidades, precio, tamaño) {
  Producto.call(this, nombre, categoria, unidades, precio)

  this.tamaño = tamaño
  this.getInfo = () =>
    `${this.nombre} (${this.tamaño} metros) (${this.categoria}): ${
      this.unidades
    } uds x ${this.precio} € = ${this.importe()} €`

  const toStringHeredado = this.toString() + `\nTamaño: ${this.tamaño}`
  this.toString = () => toStringHeredado
}

const tele = new Televisores('TV Samsung 42', 'Televisores', 4, 345.95, 8)
console.log(tele.toString())
console.log(tele.valueOf())
