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
    VALORES_MINIMOS: `Los valores mínimos son: ${CONFIG.LIMITES.ANCHO_MIN} de ancho y ${CONFIG.LIMITES.ALTO_MIN} de alto ❗`,
    USUARIO_NO_RELLENADO: 'Por favor rellena el nombre del usuario'
  },
  FIN_PARTIDA: {
    VICTORIA: '¡Has ganado!',
    DERROTA: '¡Has perdido!',
    NUEVA_PARTIDA: '¿Estás seguro de que deseas empezar una nueva partida?'
  },
  BIENVENIDA: `Bienvenido ${localStorage.getItem('usuarioActual')}`,
  CONTINUAR: 'Continuar Partida',
  CERRAR_SESION: 'Cerrar Sesión'
}

/**
 * -------------- REFERENCIAS AL DOM --------------
 */

// Formulario de inicio de sesión
const formLogin = document.getElementById('login')

// Sección de bienvenida donde se encuentra el mensaje de bienvenida y el botón para continuar con la última partida guardada
const seccionBienvenida = document.getElementById('bienvenida')

// Formulario de valores
const formValores = document.getElementById('formValores')

// Referencia a la tabla del juego
const tabla = document.querySelector('.tabla')

// Referencia al diálogo de fin de partida
const dialogFinDePartida = document.querySelector('.finDePartida')

// Referencia al panel de información donde se encuentra el contador de banderas y el cronómetro
const panelInfo = document.querySelector('.panelInfo')

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

// Celdas abiertas, es un array que usaremos despues a la hora de continuar la última partida guardada para saber qué celdas estaban abiertas y así poderlas abrir al cargar la partida.
let celdasAbiertas = []

// Celdas con banderas
let celdasBandera = []

/**
 * -------------- FUNCIONES --------------
 */

function mostrarError(texto) {
  const error = document.querySelector('.error')
  error.textContent = texto
}

// Cuando cargue la página llamará a las funciones generarTablero e iniciarSesión
window.addEventListener('load', () => {
  iniciarSesion() // Controlará el formulario de incio de sesión
})

// Event listener para guardar el estado del juego antes de cerrar la ventana
window.addEventListener('beforeunload', guardarPartida)

function iniciarSesion() {
  if (localStorage.getItem('usuarioActual')) {
    // Se elimina el formulario de inicio de sesión y se muestra el mensaje de bienvenida
    formLogin.remove()
    const parrafoUsuario = document.createElement('p')
    parrafoUsuario.textContent = MENSAJES.BIENVENIDA
    seccionBienvenida.appendChild(parrafoUsuario)

    // Si existe una partida guardada entonces se muestra el botón para continuar la partida
    if (localStorage.getItem(localStorage.getItem('usuarioActual')) !== '') {
      const botonContinuarPartida = document.createElement('button')
      botonContinuarPartida.textContent = MENSAJES.CONTINUAR
      botonContinuarPartida.classList.add('continuar')
      botonContinuarPartida.addEventListener('click', continuarPartida)

      seccionBienvenida.appendChild(botonContinuarPartida)
    }

    // Añadir botón para cerrar la sesión
    const botonCerrarSesion = document.createElement('button')
    botonCerrarSesion.textContent = MENSAJES.CERRAR_SESION
    botonCerrarSesion.classList.add('cerrarSesion')
    botonCerrarSesion.addEventListener('click', cerrarSesion)

    seccionBienvenida.appendChild(botonCerrarSesion)

    generarTablero() // Controlará el formulario de ancho y alto y cuando se envíe generará el tablero
  }

  formLogin.addEventListener('submit', e => {
    e.preventDefault()

    const usuario = document.getElementById('usuario')
    if (!usuario.value) {
      mostrarError(MENSAJES.ERROR.USUARIO_NO_RELLENADO)
      return
    }

    // Si no existe ninguna partida guardada entonces le da un valor de un string vacío
    if (localStorage.getItem(localStorage.getItem('usuarioActual')) === '') {
      localStorage.setItem(usuario.value.toLocaleLowerCase(), '')
    }
    localStorage.setItem('usuarioActual', usuario.value.toLocaleLowerCase())
    location.reload()
  })
}

// Función para cerrar la sesión
function cerrarSesion() {
  localStorage.setItem('usuarioActual', '')
  location.reload()
}

// Función para generar el tablero y empezar la partida
function generarTablero() {
  // Mostrar el formulario de valores
  formValores.style.display = 'block'

  // Evento de envío del formulario
  formValores.addEventListener('submit', e => {
    e.preventDefault()

    // Validación de datos de entrada
    ancho = document.getElementById('ancho').value
    alto = document.getElementById('alto').value

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

    // Crear la matriz y generar el tablero, esta es una forma corta de crear una matriz bidimensional llena de 0
    matriz = Array.from({ length: alto }, () =>
      Array.from({ length: ancho }).fill(CONFIG.INDICES.NADA)
    )
    crearBombas()
    rellenarTablero()
    dibujarTableroHTML()
  })
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
      celda.classList.add('celda')

      // Si es una bomba, añadir la imagen correspondiente
      const esBomba = matriz[y][x] === CONFIG.INDICES.BOMBA
      if (esBomba) {
        const mina = document.createElement('img')
        mina.src = CONFIG.IMG.MINA
        mina.classList.add('mina')
        mina.style.display = 'none'
        celda.appendChild(mina)
      }

      // Abrir la celda en caso de que esté abierta en la última partida guardada
      if (celdasAbiertas.find(celda => celda.x === x && celda.y === y)) {
        celda.classList.add('abierto')
        if (matriz[y][x] !== CONFIG.INDICES.NADA) {
          celda.textContent = matriz[y][x]
        }
      }

      // Poner bandera en la celda en caso de que tenga bandera en la última partida guardada
      if (celdasBandera.find(celda => celda.x === x && celda.y === y)) {
        crearBandera(celda)
      }

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
        if (!intervaloContador || celda.classList.contains('abierto')) return // Aquí es donde verifico si el intervalo es null, que quiere decir que la partida ha finalizado, si es así entonces no puedes poner banderas, también verifico si la casilla ya está abierta, si ya está abierta entonces no dejo poner bandera
        e.preventDefault()
        const banderaActual = celda.querySelector('.bandera')
        if (banderaActual) {
          banderas.textContent = +banderas.textContent + 1 // El + antes de banderas.textContent es una forma de pasar el valor a número, es la forma más sencilla y recomendada. He usado esta forma a lo largo del documento así que no volveré a explicarlo.
          banderaActual.remove()
          // Eliminar la celda con la bandera para luego continuar con la partida guardada y la bandera quitada
          celdasBandera.splice(
            celdasBandera.findIndex(celda => celda.x === x && celda.y === y),
            1
          )
          return
        }
        crearBandera(celda)
        banderas.textContent -= 1

        // Guardar la celda con la bandera para luego continuar con la partida guardada y las banderas puestas
        celdasBandera.push({ x, y })
      })

      // Añadir el botón a la tabla de juego
      tabla.appendChild(celda)
    }
  }

  // Eliminar mensaje de error y formulario de entrada
  document.querySelector('.error').remove()
  document.getElementById('formValores').remove()

  // Mostrar el panel de información (banderas y cronómetro)
  panelInfo.style.display = 'flex'

  // Eliminar sección de bienvenida y botón de continuar
  seccionBienvenida.remove()

  // Iniciar el contador
  logicaContador()
}

// Función para crear una bandera en una celda, la tengo separada porque reutilizo este código cuando pone la bandera al continuar la última partida guardada
function crearBandera(celda) {
  const bandera = document.createElement('img')
  bandera.src = CONFIG.IMG.BANDERA
  bandera.classList.add('bandera')
  celda.appendChild(bandera)
}

// Función para manejar la lógica del contador
function logicaContador() {
  const representarContador = () => {
    segundosHTML.textContent = segundos.toString().padStart(2, '0')
    minutosHTML.textContent = minutos.toString().padStart(2, '0')
  }

  // Solo si es una partida nueva entonces calcula cuántos minutos y segundos son aceptables según el ancho y el alto del tablero
  if (!segundos && !minutos) {
    // Calcular el tiempo inicial del contador
    segundos = Number.parseInt((ancho * alto * CONFIG.SEGUNDOS_POR_CELDA) % 60)
    minutos = Number.parseInt((ancho * alto * CONFIG.SEGUNDOS_POR_CELDA) / 60)
  }
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
  celdasAbiertas.push({ x, y }) // Guardamos la celda abierta para luego abrirla cuando se cargue la partida guardada

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
  // Eliminar la partida guardada
  localStorage.setItem(localStorage.getItem('usuarioActual'), '')

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
  dialogFinDePartida.textContent = victoria
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

// Función para guardar la partida del usuario actual
function guardarPartida() {
  if (!intervaloContador) return // Si no hay una partida en curso entonces no guardar nada
  const usuarioActual = localStorage.getItem('usuarioActual')
  localStorage.setItem(
    usuarioActual,
    JSON.stringify({
      banderas: banderas.textContent,
      minutos,
      segundos,
      matriz,
      intervaloContador,
      celdasParaGanar,
      ancho,
      alto,
      celdasAbiertas,
      celdasBandera
    })
  )
}

// Función para continuar la partida respecto a la última partida guardada del usuario
function continuarPartida() {
  const partidaGuardada = JSON.parse(
    localStorage.getItem(localStorage.getItem('usuarioActual'))
  )

  banderas.textContent = partidaGuardada.banderas
  minutos = partidaGuardada.minutos
  segundos = partidaGuardada.segundos
  ancho = partidaGuardada.ancho
  alto = partidaGuardada.alto
  celdasParaGanar = partidaGuardada.celdasParaGanar
  intervaloContador = partidaGuardada.intervaloContador
  matriz = partidaGuardada.matriz
  celdasAbiertas = partidaGuardada.celdasAbiertas
  celdasBandera = partidaGuardada.celdasBandera

  console.log(matriz)

  dibujarTableroHTML()
}
