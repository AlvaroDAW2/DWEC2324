const datos = [
  {
    id: 1,
    nombre: 'Juan',
    edad: 18
  },
  {
    id: 2,
    nombre: 'Ana',
    edad: 40
  },
  {
    id: 3,
    nombre: 'Pedro',
    edad: 34
  }
]

function getDatos() {
  return datos
}

function getDatosSinc() {
  setTimeout(getDatos, 3000)
}

function getDatosProm() {
  return new Promise(resolve => {
    setTimeout(() => resolve(getDatos()), 3000)
  })
}

getDatosProm()
  .then(datos => console.log(datos))
  .catch(error => console.error(error))

async function asyawt() {
  try {
    const misDatos = await getDatosProm()
    console.log(misDatos)
  } catch (error) {
    console.error(error.message)
  }
}

asyawt()
