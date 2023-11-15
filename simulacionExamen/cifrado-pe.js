// function cifradoPe(palabra) {
//   const vocales = ['a', 'e', 'i', 'o', 'u']
//   vocales.forEach(vocal => {
//     palabra = palabra.replaceAll(vocal, vocal + 'pe')
//   })
//   return 'pe' + palabra.replaceAll('pepe', 'pe')
// }
// console.log(cifradoPe('Autenticacion'))

function cifradoPe(palabra) {
  const vocales = ['a', 'e', 'i', 'o', 'u']
  const arrayLetras = Array.from(palabra)
  let resultado = 'pe'

  arrayLetras.forEach((letra, indice) => {
    if (
      vocales.includes(letra.toLowerCase()) &&
      arrayLetras[indice + 1] &&
      !vocales.includes(arrayLetras[indice + 1])
    ) {
      resultado += letra + 'pe'
    } else resultado += letra
  })
  return resultado
}

console.log(cifradoPe('Autenticacion'))
