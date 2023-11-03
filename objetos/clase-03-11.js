const persona1 = {
  nombre: 'Juan',
  apellido: 'García',
  ano: 1815
}

const persona2 = new Object()
persona2.nombre = 'Pedro'
persona2.apellido = 'Perez'
persona2.ano = 1891

function Persona(nom, ape, an) {
  this.nombre = nom
  this.apellido = ape
  this.ano = an
}

const persona1Obj = new Persona(
  persona1.nombre,
  persona1.apellido,
  persona1.ano
)

const persona2Obj = new Persona(
  persona2.nombre,
  persona2.apellido,
  persona2.ano
)

console.log(persona1Obj, persona2Obj)

console.log('Recorrer la 1º Persona con un forin:')
for (const key in persona1Obj) {
  console.log(key + ': ' + persona1Obj[key])
}

persona1Obj.nacionalidad = 'Inglesa'
console.log(persona1Obj.nacionalidad)

delete persona1Obj.ano

for (const key in persona1Obj) {
  console.log(key + ': ' + persona1Obj[key])
}
