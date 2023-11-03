const persona1 = {
  nombre: 'Juan',
  apellido: 'García',
  nombreCompleto: function () {
    return this.nombre + ' ' + this.apellido
  }
}

console.log(persona1.nombre)
console.log(persona1['nombre'])
console.log(persona1.apellido)
console.log(persona1.nombreCompleto())
