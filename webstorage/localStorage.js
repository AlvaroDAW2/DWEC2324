window.addEventListener('load', iniciar)

function iniciar() {
  // Comprobar si el navegador soporta Storage
  alert(
    'El navegador ' +
      (typeof Storage === undefined ? 'no ' : '' + 'soporta WebStorage')
  )

  // OBTENCION DE USUARIO Y SALUDAR
  const usuario = localStorage.getItem('usuario')
  const saludo = document.getElementById('saludo')

  if (usuario !== null) {
    saludo.textContent =
      'Bienvenido/a de nuevo ' + localStorage.getItem('usuario')
    document.getElementById('login').textContent = 'Log out'
  } else {
    localStorage.setItem('usuario', prompt('¿Cual es tu nombre?'))
    saludo.textContent = 'Tu primera visita ' + localStorage.getItem('usuario')
  }

  // CONTADOR
  if (sessionStorage.getItem('contador') === undefined) {
    sessionStorage.setItem('contador', 0)
  }
  const contador = document.getElementById('contador')

  contador.textContent = Number(sessionStorage.getItem('contador'))

  document.getElementById('incrementar').addEventListener('click', () => {
    sessionStorage.setItem(
      'contador',
      Number(sessionStorage.getItem('contador')) + 1
    )
    contador.textContent = Number(sessionStorage.getItem('contador'))
  })

  document.getElementById('decrementar').addEventListener('click', () => {
    sessionStorage.setItem(
      'contador',
      Number(sessionStorage.getItem('contador')) - 1
    )
    contador.textContent = Number(sessionStorage.getItem('contador'))
  })

  // LOG OUT
  document.getElementById('login').addEventListener('click', () => {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  })
}
