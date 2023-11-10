/* Act 3.2 Crea un Objeto Televisores que
hereda de Productos y que tiene una nueva propiedad
llamada tamaño. El método getInfo mostrará el tamaño junto al nombre */

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

function Televisores(nombre, categoria, unidades, precio, tamaño) {
  Producto.call(this, nombre, categoria, unidades, precio)

  this.tamaño = tamaño
  this.getInfo = () =>
    `${this.nombre} (${this.tamaño} metros) (${this.categoria}): ${
      this.unidades
    } uds x ${this.precio} € = ${this.importe()} €`
}

const tele = new Televisores('TV Samsung 42', 'Televisores', 4, 345.95, 8)
console.log(tele.getInfo())
