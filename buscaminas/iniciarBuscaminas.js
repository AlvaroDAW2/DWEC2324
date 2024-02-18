/**
 * -------------- CONFIGURACIÓN --------------
 */

// Directorio de imágenes
const DIR_IMG = './img'

// Configuración del juego
const CONFIG = {
  INDICES: {
    BOMBA: -1,
    NADA: 0
  },
  LIMITES: {
    ANCHO_MAX: 25,
    ALTO_MAX: 25,
    ANCHO_MIN: 5,
    ALTO_MIN: 5
  },
  IMG: {
    MINA: `${DIR_IMG}/mina.png`,
    BANDERA: `${DIR_IMG}/bandera.png`
  },
  PORCENTAJE_BOMBA: 0.15,
  SEGUNDOS_POR_CELDA: 1.25
}

// Mensajes del juego
const MENSAJES = {
  ERROR: {
    NO_DATOS: 'Inserta datos en ambos campos ❗',
    VALORES_MAXIMOS: `Los valores máximos son: ${CONFIG.LIMITES.ANCHO_MAX} de ancho y ${CONFIG.LIMITES.ALTO_MAX} de alto ❗`,
    VALORES_MINIMOS: `Los valores mínimos son: ${CONFIG.LIMITES.ANCHO_MIN} de ancho y ${CONFIG.LIMITES.ALTO_MIN} de alto ❗`
  },
  FIN_PARTIDA: {
    VICTORIA: '¡Has ganado!',
    DERROTA: '¡Has perdido!',
    NUEVA_PARTIDA: '¿Estás seguro de que deseas empezar una nueva partida?'
  }
}

/**
 * -------------- REFERENCIAS AL DOM --------------
 */

// Referencia a la tabla del juego
const tabla = document.querySelector('.tabla')

// Referencia al diálogo de fin de partida
const dialogFinDePartida = document.querySelector('.finDePartida')

// Referencia al contador de banderas
const banderas = document.getElementById('nBanderas')

// Referencia a los elementos de tiempo (minutos y segundos)
const minutosHTML = document.getElementById('minutos')
const segundosHTML = document.getElementById('segundos')

/**
 * -------------- VARIABLES UTILIZADAS DE FORMA GLOBAL --------------
 */

// Matriz que representa el tablero del juego
let matriz = []

// Ancho y alto del tablero
let ancho, alto

// Número de celdas que necesitan ser abiertas para ganar
let celdasParaGanar

// Minutos y segundos del contador
let minutos
let segundos

// Intervalo del contador (lo guardo de forma global para luego usarlo para comprobar si ha acabado la partida o no a la hora de poner banderas)
let intervaloContador

/**
 * -------------- FUNCIONES --------------
 */

// Función para generar el tablero y empezar la partida
function generarTablero() {
  // Evento de envío del formulario
  document.getElementById('formValores').addEventListener('submit', e => {
    e.preventDefault()

    // Validación de datos de entrada
    ancho = document.getElementById('ancho').value
    alto = document.getElementById('alto').value

    const mostrarError = texto => {
      const error = document.querySelector('.error')
      error.textContent = texto
    }

    if ([ancho, alto].includes('')) {
      mostrarError(MENSAJES.ERROR.NO_DATOS)
      return
    }

    if (ancho > CONFIG.LIMITES.ANCHO_MAX || alto > CONFIG.LIMITES.ALTO_MAX) {
      mostrarError(MENSAJES.ERROR.VALORES_MAXIMOS)
      return
    }

    if (ancho < CONFIG.LIMITES.ANCHO_MIN || alto < CONFIG.LIMITES.ALTO_MIN) {
      mostrarError(MENSAJES.ERROR.VALORES_MINIMOS)
      return
    }

    // Iniciar el contador
    logicaContador()

    // Crear la matriz y generar el tablero, esta es una forma corta de crear una matriz bidimensional llena de 0
    matriz = Array.from({ length: alto }, () =>
      Array.from({ length: ancho }).fill(CONFIG.INDICES.NADA)
    )
    crearBombas()
    rellenarTablero()
    dibujarTableroHTML()
  })
}

// Función para manejar la lógica del contador
function logicaContador() {
  const representarContador = () => {
    segundosHTML.textContent = segundos.toString().padStart(2, '0')
    minutosHTML.textContent = minutos.toString().padStart(2, '0')
  }

  // Calcular el tiempo inicial del contador
  segundos = Number.parseInt((ancho * alto * CONFIG.SEGUNDOS_POR_CELDA) % 60)
  minutos = Number.parseInt((ancho * alto * CONFIG.SEGUNDOS_POR_CELDA) / 60)
  representarContador()

  // Actualizar el contador cada segundo
  intervaloContador = setInterval(() => {
    segundos--
    if (segundos < 0) {
      minutos--
      segundos = 59
    }
    representarContador()

    // Terminar la partida si el tiempo llega a cero
    if (minutos === 0 && segundos <= 0) {
      finDePartida()
    }
  }, 1000)
}

// Función para generar un número aleatorio en un rango dado
function numeroAleatorio(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Función para crear las bombas en el tablero
function crearBombas() {
  let bombas = Math.round(ancho * alto * CONFIG.PORCENTAJE_BOMBA)
  banderas.textContent = bombas // El número de banderas disponibles es el número de bombas que hay
  while (bombas > 0) {
    const x = numeroAleatorio(0, ancho - 1)
    const y = numeroAleatorio(0, alto - 1)
    if (matriz[y][x] !== CONFIG.INDICES.NADA) continue // Si la celda no es 0 entonces continuar (porque ya es una bomba)
    matriz[y][x] = CONFIG.INDICES.BOMBA
    bombas--
  }
}

// Función para rellenar el tablero con los números de las bombas cercanas
function rellenarTablero() {
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (matriz[y][x] !== CONFIG.INDICES.BOMBA) continue

      // Aquí hago un conjunto de 2 for con 2 variables cada for (vecesx|y y x|yAlrededor) que me ayuda a iterar las 9 celdas, las 3 de arriba, las 3 de en medio y las 3 de abajo, aunque el for puede costar entenderlo al principio creo que facilita un poco el código.
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
            matriz[yAlrededor] !== undefined && // Si existe la fila
            matriz[yAlrededor][xAlrededor] !== undefined && // Si existe la celda
            matriz[yAlrededor][xAlrededor] !== CONFIG.INDICES.BOMBA
          ) {
            matriz[yAlrededor][xAlrededor] += 1
          }
        }
      }
    }
  }

  // Calcular el número de celdas necesarias para ganar, hago dos reduce para acumular el numero de 0 (0 = una celda libre)
  celdasParaGanar = matriz.reduce((total, fila) => {
    return (
      total +
      fila.reduce((filaTotal, valor) => {
        return valor === 0 ? filaTotal + 1 : filaTotal
      }, 0)
    )
  }, 0)
}

// Función para dibujar el tablero en la pantalla
function dibujarTableroHTML() {
  // Añadir CSS para la tabla del juego según el ancho y el alto
  tabla.style.cssText += `
    display: grid;
    grid-template-columns: repeat(${ancho}, 1fr);
    grid-template-rows: repeat(${alto}, 1fr);
  `

  // Mostrar el botón de nueva partida
  document.getElementById('nueva').style.display = 'block'

  // Crear botones para cada celda del tablero
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const celda = document.createElement('button')

      // Si es una bomba, añadir la imagen correspondiente
      const esBomba = matriz[y][x] === CONFIG.INDICES.BOMBA
      if (esBomba) {
        const mina = document.createElement('img')
        mina.src = CONFIG.IMG.MINA
        mina.classList.add('mina')
        mina.style.display = 'none'
        celda.appendChild(mina)
      }

      celda.classList.add('celda')

      // Evento que maneja cuando haces click izquierdo en una celda
      celda.addEventListener('click', () => {
        if (celda.querySelector('.bandera')) return
        if (esBomba) {
          finDePartida()
        } else {
          liberarCeldas(x, y, ancho * y + x)
        }
      })

      // Evento que maneja cuando haces click derecho en una celda
      celda.addEventListener('contextmenu', e => {
        if (!intervaloContador) return // Aquí es donde verifico si el intervalo es null, que quiere decir que la partida ha finalizado, si es así entonces no puedes poner banderas
        e.preventDefault()
        const banderaActual = celda.querySelector('.bandera')
        if (banderaActual) {
          banderas.textContent = +banderas.textContent + 1 // El + antes de banderas.textContent es una forma de pasar el valor a número, es la forma más sencilla y recomendada. He usado esta forma a lo largo del documento así que no volveré a explicarlo.
          banderaActual.remove()
          return
        }
        const bandera = document.createElement('img')
        bandera.src = CONFIG.IMG.BANDERA
        bandera.classList.add('bandera')
        banderas.textContent -= 1
        celda.appendChild(bandera)
      })

      // Añadir el botón a la tabla de juego
      tabla.appendChild(celda)
    }
  }

  // Eliminar mensaje de error y formulario de entrada
  document.querySelector('.error').remove()
  document.getElementById('formValores').remove()
}

// Función para liberar celdas al hacer click en una celda vacía
function liberarCeldas(x, y, indiceBoton) {
  const boton = tabla.children[indiceBoton] // recogemos el botón según su índice

  // Si no existe el botón o ya está abierto o las coordenadas proporcionadas están fuera de los límites entonces no hago nada
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

  // Marcar la celda como abierta
  boton.classList.toggle('abierto')

  // Si la celda es una celda vacía, continuar liberando celdas cerca de ella
  if (matriz[y][x] === CONFIG.INDICES.NADA) {
    if (--celdasParaGanar <= 0) finDePartida(true) // Si todas las celdas vacías están libres entonces el jugador ha ganado

    liberarCeldas(+x + 1, y, +indiceBoton + 1) // Derecha
    liberarCeldas(+x - 1, y, +indiceBoton - 1) // Izquierda

    // Liberar celdas arriba y abajo
    for (let xArriba = +x - 1, veces = 0; veces < 3; xArriba++, veces++) {
      liberarCeldas(xArriba, +y - 1, (+y - 1) * ancho + +xArriba)
    } // Arriba
    for (let xAbajo = +x - 1, veces = 0; veces < 3; xAbajo++, veces++) {
      liberarCeldas(xAbajo, +y + 1, (+y + 1) * ancho + +xAbajo)
    } // Abajo
  } else {
    // Si la celda no es una celda vacía, mostrar el número de bombas cercanas
    boton.textContent = matriz[y][x]
  }
}

// Función para terminar la partida
function finDePartida(victoria = false) {
  clearInterval(intervaloContador)
  intervaloContador = null

  // Mostrar todas las celdas del tablero
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      const celda = tabla.children[y * ancho + x]
      celda.classList.add('abierto')
      if (celda.querySelector('.mina')) {
        // Si es una bomba mostrar la bomba
        celda.querySelector('.mina').style.display = 'block'
      } else if (matriz[y][x] !== CONFIG.INDICES.NADA) {
        // Si no es una celda vacía mostrar su número de bombas cercanas
        celda.textContent = matriz[y][x]
      }
    }
  }

  // Mostrar el mensaje de fin de partida
  document.getElementById('msgFinDePartida').textContent = victoria
    ? MENSAJES.FIN_PARTIDA.VICTORIA
    : MENSAJES.FIN_PARTIDA.DERROTA
  dialogFinDePartida.style.display = 'flex'

  // Eliminar todas las banderas colocadas
  tabla.querySelectorAll('.bandera').forEach(bandera => bandera.remove())
}

// Evento para empezar una nueva partida
document.getElementById('nueva').addEventListener('click', nuevaPartida)

// Función para iniciar una nueva partida
function nuevaPartida() {
  if (!confirm(MENSAJES.FIN_PARTIDA.NUEVA_PARTIDA)) return
  location.reload() // Recarga la página
}

// Generar el tablero al cargar la página
generarTablero()
