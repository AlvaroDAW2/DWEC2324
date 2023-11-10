// DOM
const tabla = document.querySelector('.tabla')

function dibujarTableroHTML() {
  // TODO: VALIDAR LOS DATOS
  const ancho = prompt('Dame el ancho pls:')
  const alto = prompt('Dame el alto pls:')

  // Añadir css
  tabla.style.cssText += `
    grid-template-columns:repeat(${ancho}, 1fr);
    grid-template-rows:repeat(${alto}, 1fr);
  `

  // Crear botones
  for (let i = 0; i < ancho * alto; i++) {
    const button = document.createElement('button')
    button.textContent = 'x'
    tabla.append(button)
  }
}

dibujarTableroHTML()
