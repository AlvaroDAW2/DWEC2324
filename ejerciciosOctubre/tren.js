function calculoPersonas(numero) {
  const array = []
  while (numero % 10 !== 0) {
    array.push(numero % 10)
    numero = Math.floor(numero / 10)
  }

  let bajados = 0
  let subidos = 0

  while (array.length) {
    subidos += array.shift()
    bajados += array.shift() ?? 0
  }
  return subidos - bajados
}

console.log(calculoPersonas(85531))
