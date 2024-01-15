window.addEventListener('load', inicio)

const texto = document.getElementById('texto')

function inicio() {
  document
    .getElementById('crearParrafo')
    .addEventListener('click', crearParrafo)
  document.getElementById('crearImagen').addEventListener('click', crearImagen)
  document
    .getElementById('borrarUltimo')
    .addEventListener('click', borrarUltimo)
  document
    .getElementById('borrarPrimero')
    .addEventListener('click', borrarPrimero)
  document
    .getElementById('sustituirPrimVacio')
    .addEventListener('click', sustituirPrimero)
  document
    .getElementById('añadirBorrarPunto')
    .addEventListener('click', añadirBorrarPunto)
}

function crearParrafo() {
  const parrafo = document.createElement('p')
  parrafo.innerText = texto.value
  parrafo.classList.add('miClase')
  document.getElementById('div1').appendChild(parrafo)
}

function crearImagen() {
  const imagen = document.createElement('img')
  imagen.src = 'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg'
  imagen.width = 300
  imagen.height = 300
  document.getElementById('div1').appendChild(imagen)
}

function borrarUltimo() {
  document.getElementById('div1').lastElementChild.remove()
}

function borrarPrimero() {
  document.getElementById('div1').firstElementChild.remove()
}

function sustituirPrimero() {
  document.getElementById('div1').firstElementChild.innerText = texto.value
}

function añadirBorrarPunto() {
  Array.from(document.getElementById('div1').children).forEach(child => {
    const texto = child.innerText
    child.innerText =
      texto.charAt(texto.length - 1) === '.' ? texto.slice(0, -1) : texto + '.'
  })
}
