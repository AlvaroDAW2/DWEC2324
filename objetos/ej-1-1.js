/* Act 3.2 Crea un objeto llamado tvSamsung con
las propiedades nombre (TV Samsung 42”), categoría (Televisores),
unidades (4), precio (345.95) y con un método llamado importe que
 devuelve el valor total de las unidades (nº de unidades * precio) */

const tvSamsung = {
  nombre: 'TV Samsung 42',
  categoria: 'Televisores',
  unidades: 4,
  precio: 345.95,
  importe: function () {
    return this.unidades * this.precio
  }
}

console.log(tvSamsung.importe())
