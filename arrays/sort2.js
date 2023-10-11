// function ordenarNotas() {
//   const arrayNotas = Array.from(arguments)
//   return arrayNotas.sort((nota1, nota2) => nota1 - nota2)
// }

function ordenarNotas() {
  const arrayNotas = []
  for (let i = 0; i < arguments.length; i++) {
    arrayNotas.push(arguments[i])
  }
  return arrayNotas.sort((nota1, nota2) => nota1 - nota2)
}

console.log(ordenarNotas(1, 21, 3))
