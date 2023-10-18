// Funciones de expresion
// const resultado = function () {
//   console.log('hola')
// }

// // Funciones anonimas (de expresion)
// const producto = function (a, b) {
//   return a * b
// }
// const resultado = producto(2, 3)

// console.log(resultado)

// Callbacks
// function llamarCallback(callback) {
//   callback()
// }

// llamarCallback(() => console.log('hola'))

// Funcion autoinvocada y anonima
// ;(usuario => {
//   console.log(usuario)
// })('Alvaro')

// Recursividad
// function factorial(n) {
//   if (n <= 1) return 1
//   return n * factorial(n - 1)
// }

// console.log(factorial(5))

// Foreach
// const miArray = [12, 13, 112, 143, 97]
// miArray.forEach((contenido, posicion) => {
//   console.log(`Posición ${posicion}: ${contenido}`)
// })

// Set
// const miSet = new Set([2, 3, 4, 5, 3, 2, 7])

// for (const item of miSet) {
//   console.log(item)
// }

// console.log('\nConvertido a array:\n')

// const miArray = [...miSet]

// miArray.forEach(elemento => console.log(elemento))

// Map
const miMap = new Map([
  ['nombre', 'Alvaro'],
  ['edad', '18']
])

console.log(miMap.get('nombre'))
