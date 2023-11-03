// const fecha1 = new Date(
//   'Wed Mar 25 2015 09:15 GMT +0100(W. Europe Standard Time)'
// )
// const fecha2 = new Date('October 12 2023')
// const fecha3 = new Date('2023-05-27')
// const fecha4 = new Date('2023')
// console.log(fecha1, fecha2, fecha3, fecha4)

const fecha = new Date()
console.log('Fecha: ' + fecha)
console.log('toString: ' + fecha.toString())
console.log('toUTCString: ' + fecha.toUTCString())
console.log('toDateString: ' + fecha.toDateString())

const fechaMili = new Date(864000000)
console.log(fechaMili)

console.log(fecha.getDay())
