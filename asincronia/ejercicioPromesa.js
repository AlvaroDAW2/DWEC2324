// REFERENCIAS A HTML
const mensajes = document.getElementById('mensajes')
const boton = document.getElementById('probarPromesa')

let contadorGlobal = 0

boton.addEventListener('click', probarPromise)

function probarPromise() {
  const contador = ++contadorGlobal

  mensajes.insertAdjacentHTML(
    'beforeend',
    contador + ') Empieza el código síncrono <br />'
  )
  const promesa = new Promise(resolve => {
    mensajes.insertAdjacentHTML(
      'beforeend',
      contador +
        ') Dentro de la promesa, antes del timeout. Empieza el código asíncrono <br />'
    )
    setTimeout(() => {
      resolve()
    }, Math.random() * 4000 + 1000)
  })

  promesa.then(() =>
    mensajes.insertAdjacentHTML(
      'beforeend',
      contador + ') Dentro del then. Código asíncrono terminado <br />'
    )
  )
  mensajes.insertAdjacentHTML(
    'beforeend',
    contador + ') Código debajo del then. Código síncrono terminado <br />'
  )
}
