function Persona(nombre, apellido, edad) {
  this.nombre = nombre
  this.apellido = apellido
  this.edad = edad
  this.nombreCompleto = () => `${this.nombre} ${this.apellido}`
}

const pedro = new Persona('Pedro', 'Miranda', 19)
pedro.nacionalidad = 'Española'
console.log(pedro.nombreCompleto(), pedro.nacionalidad)

Persona.prototype.fecha = new Date().toLocaleString()
console.log(pedro.fecha)
