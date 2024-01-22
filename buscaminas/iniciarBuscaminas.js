const CONFIG = {
  ANCHO_MAX: 20,
  ALTO_MAX: 20
}

// DOM
const tabla = document.querySelector('.tabla')

// Logica
let matriz = []

function generarTablero() {
  document.getElementById('formValores').addEventListener('submit', e => {
    e.preventDefault()

    // Validacion de datos
    const ancho = document.getElementById('ancho').value
    const alto = document.getElementById('alto').value

    const mostrarError = texto => {
      const error = document.querySelector('.error')
      error.textContent = texto
    }
    if ([ancho, alto].includes('')) {
      mostrarError('Inserta datos en ambos campos ❗')
      return
    }
    if (ancho > CONFIG.ANCHO_MAX || alto > CONFIG.ALTO_MAX) {
      mostrarError(
        `Los valores maximos son: ${CONFIG.ANCHO_MAX} de ancho y ${CONFIG.ALTO_MAX} de alto ❗`
      )
      return
    }

    // Creamos la matriz
    matriz = Array.from({ length: alto }, () =>
      Array.from({ length: ancho }).fill(0)
    )
    crearBombas(ancho, alto)
    dibujarTableroHTML(ancho, alto)
    console.log(matriz)
  })
}

function numeroAleatorio(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function crearBombas(ancho, alto) {
  let bombas = ancho * alto * 0.3
  while (bombas > 0) {
    const x = numeroAleatorio(0, ancho - 1)
    const y = numeroAleatorio(0, alto - 1)
    if (matriz[y][x] !== 0) continue
    matriz[y][x] = 1
    bombas--
  }
}

function dibujarTableroHTML(ancho, alto) {
  // Añadir css
  tabla.style.cssText += `
  display: grid;
  grid-template-columns:repeat(${ancho}, 1fr);
  grid-template-rows:repeat(${alto}, 1fr);
`
  document.getElementById('nueva').style.display = 'block'
  // Crear botones
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const button = document.createElement('button')
      button.classList.add('celda')
      button.addEventListener('click', () => {
        button.classList.toggle('abierto')
        if (matriz[y][x] === 1) console.log('muerto')
      })

      // Añadir el boton a la tabla de juego
      tabla.appendChild(button)
    }
  }

  document.querySelector('.error').remove()
  document.getElementById('formValores').remove()
}

document.getElementById('nueva').addEventListener('click', nuevaPartida)

function nuevaPartida() {
  if (!confirm('¿Deseas de verdad empezar de nuevo?')) return
  location.reload()
}

generarTablero()
