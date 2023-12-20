const arrayNotas = [5.2, 3.9, 6, 9.75, 7.5, 3]

let notaMedia = (
  arrayNotas.reduce((acc, actual) => acc + actual) / arrayNotas.length
).toFixed(2)
console.log(notaMedia)
