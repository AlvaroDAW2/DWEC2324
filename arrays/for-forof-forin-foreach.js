const hoy = [3, 4, 7, , { nombre: 'alvaro', apellidos: 'ureña' }]

console.log('For normal:')
for (let i = 0; i < hoy.length; i++) {
  console.log(hoy[i])
}

console.log('\n')

console.log('For in:')
for (const key in hoy) {
  console.log(hoy[key])
}

console.log('\n')
console.log('For of:')
for (const valor of hoy) {
  console.log(valor instanceof Object ? valor.nombre : valor)
}

console.log('\n')
console.log('For each:')
hoy.forEach(element => console.log(element))
