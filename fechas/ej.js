// lOs dias que han pasado desde hoy y el 7 de mayo de 1950
const hoy = new Date()
const fechaAntigua = new Date('1990-05-07')
function difFechas(fecha1, fecha2) {
  const dif = new Date(fecha1.getTime() - fecha2.getTime())
  const anios = dif / (1000 * 60 * 60 * 24 * 365)
  const meses = (anios % 1) * 12
  const dias = (meses % 1) * 30
  const horas = (dias % 1) * 24
  const minutos = (horas % 1) * 60
  const segundos = (minutos % 1) * 60
  return [
    [Math.floor(dias), Math.floor(meses), Math.floor(anios)],
    [Math.floor(horas), Math.floor(minutos), Math.floor(segundos)]
  ]
}

const diferencia = difFechas(hoy, fechaAntigua)
// const diferencia = difFechas(new Date('3/6/1971'), new Date('1/1/1970'))
console.log(diferencia)
