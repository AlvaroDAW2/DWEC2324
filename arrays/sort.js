const personas = [
  {
    nombre: 'Ian',
    edad: 20
  },
  {
    nombre: 'Álvaro',
    edad: 19
  },
  {
    nombre: 'Pepe',
    edad: 2
  },
  {
    nombre: 'Pedro',
    edad: 19
  },
  {
    nombre: 'Juan Carlos',
    edad: 27
  },
  {
    nombre: 'Sandra',
    edad: 25
  },
  {
    nombre: 'Carlos Mallén',
    edad: 17
  }
]

// const personasOdenadas = personas.sort(function (persona1, persona2) {
//   return persona1.edad - persona2.edad
// })

const personasOdenadasArrowFunction = personas.sort((persona1, persona2) =>
  persona1.nombre.localeCompare(persona2.nombre)
)

// console.log(personasOdenadas)
console.log(personasOdenadasArrowFunction)
