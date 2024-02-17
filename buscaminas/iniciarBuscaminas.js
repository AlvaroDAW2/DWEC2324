const DIR_IMG = './img'
const CONFIG = {
  INDICES: {
    BOMBA: -1,
    NADA: 0
  },
  ANCHO_MAX: 20,
  ALTO_MAX: 20,
  IMG: {
    MINA: `${DIR_IMG}/mina.png`,
    BANDERA: `${DIR_IMG}/bandera.png`
  },
  PORCENTAJE_BOMBA: 0.15
}

// DOM
const tabla = document.querySelector('.tabla')
const dialogFinDePartida = document.querySelector('.finDePartida')

// Logica
let matriz = []
let ancho, alto
let celdasParaGanar

function generarTablero() {
  document.getElementById('formValores').addEventListener('submit', e => {
    e.preventDefault()

    // Validacion de datos
    ancho = document.getElementById('ancho').value
    alto = document.getElementById('alto').value

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
      Array.from({ length: ancho }).fill(CONFIG.INDICES.NADA)
    )
    crearBombas()
    rellenarTablero()
    dibujarTableroHTML()
    console.log(matriz)
  })
}

function numeroAleatorio(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function crearBombas() {
  let bombas = ancho * alto * CONFIG.PORCENTAJE_BOMBA
  while (bombas > 0) {
    const x = numeroAleatorio(0, ancho - 1) // TODO: explicar esto
    const y = numeroAleatorio(0, alto - 1)
    if (matriz[y][x] !== CONFIG.INDICES.NADA) continue
    matriz[y][x] = CONFIG.INDICES.BOMBA
    bombas--
  }
}

function rellenarTablero() {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (matriz[y][x] !== CONFIG.INDICES.BOMBA) continue
      for (
        let vecesy = 0, yAlrededor = y - 1;
        vecesy < 3;
        yAlrededor++, vecesy++
      ) {
        for (
          let vecesx = 0, xAlrededor = x - 1;
          vecesx < 3;
          xAlrededor++, vecesx++
        ) {
          if (
            matriz[yAlrededor] !== undefined &&
            matriz[yAlrededor][xAlrededor] !== undefined &&
            matriz[yAlrededor][xAlrededor] !== CONFIG.INDICES.BOMBA
          ) {
            matriz[yAlrededor][xAlrededor] += 1
          }
        }
      }
    }
  }

  // Poner cuntas celdas vacias se necesitan liberar para ganar (celdas vacias son celdas que no son bombas o que no son un numero, su valor en la matriz es 0)
  celdasParaGanar = matriz.reduce((total, fila) => {
    return (
      total +
      fila.reduce((filaTotal, valor) => {
        return valor === 0 ? filaTotal + 1 : filaTotal
      }, 0)
    )
  }, 0)
}

function dibujarTableroHTML() {
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

      // Si es una bomba añadir la imagen de bomba
      const esBomba = matriz[y][x] === CONFIG.INDICES.BOMBA
      if (esBomba) {
        const mina = document.createElement('img')
        mina.src = CONFIG.IMG.MINA
        mina.classList.add('mina')
        mina.style.display = 'none'

        button.appendChild(mina)
      }

      button.classList.add('celda')
      button.addEventListener('click', () => {
        if (button.querySelector('.bandera')) return
        if (esBomba) {
          finDePartida()
        } else {
          liberarCeldas(x, y, ancho * y + x)
        }
      })
      button.addEventListener('contextmenu', e => {
        e.preventDefault()
        const banderaActual = button.querySelector('.bandera')
        if (banderaActual) {
          banderaActual.remove()
          return
        }
        const bandera = document.createElement('img')
        bandera.src = CONFIG.IMG.BANDERA
        bandera.classList.add('bandera')
        // mina.style.display = 'none'

        button.appendChild(bandera)
      })

      // Añadir el boton a la tabla de juego
      tabla.appendChild(button)
    }
  }

  document.querySelector('.error').remove()
  document.getElementById('formValores').remove()
}

function liberarCeldas(x, y, indiceBoton) {
  const boton = tabla.children[indiceBoton]
  if (
    !boton ||
    boton.classList.contains('abierto') ||
    x >= ancho ||
    x < 0 ||
    y < 0 ||
    y >= alto
  ) {
    return
  }

  boton.classList.toggle('abierto')
  if (matriz[y][x] === CONFIG.INDICES.NADA) {
    if (--celdasParaGanar <= 0) finDePartida(true)

    liberarCeldas(+x + 1, y, +indiceBoton + 1) // Derecha
    liberarCeldas(+x - 1, y, +indiceBoton - 1) // Izquierda
    for (let xArriba = +x - 1, veces = 0; veces < 3; xArriba++, veces++) {
      liberarCeldas(xArriba, +y - 1, (+y - 1) * ancho + +xArriba)
    } // Arriba
    for (let xAbajo = +x - 1, veces = 0; veces < 3; xAbajo++, veces++) {
      liberarCeldas(xAbajo, +y + 1, (+y + 1) * ancho + +xAbajo)
    } // Abajo
  } else {
    boton.textContent = matriz[y][x]
  }
}

function finDePartida(victoria = false) {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const celda = tabla.children[y * ancho + x]
      celda.classList.add('abierto')
      if (celda.querySelector('.mina')) {
        celda.querySelector('.mina').style.display = 'block'
      } else if (matriz[y][x] !== CONFIG.INDICES.NADA) {
        celda.textContent = matriz[y][x]
      }
    }
  }

  document.getElementById('msgFinDePartida').textContent = victoria
    ? '¡Has ganado!'
    : '¡Has perdido!'
  dialogFinDePartida.style.display = 'flex'
}

document.getElementById('nueva').addEventListener('click', nuevaPartida)

function nuevaPartida() {
  if (!confirm('¿Deseas de verdad empezar de nuevo?')) return
  location.reload()
}

generarTablero()
