function numeroPatrones(texto) {
  const patronesBuscar = ['00', '101', 'ABC', 'H0']

  const patrones = patronesBuscar.reduce((prev, current, index) => {
    let copiaTexto = texto
    while (copiaTexto.search(patronesBuscar[index]) != -1) {
      copiaTexto = copiaTexto.substring(
        copiaTexto.indexOf(patronesBuscar[index]) + 1
      )
      return prev + current
    }
  })

  return patrones
}

console.log(numeroPatrones('1110101000ABCHO'))

const totalGoals = footballLeague.teams.reduce((accumulated, currentValue) => {
  return accumulated + currentValue.goalsFor
}, 0)
