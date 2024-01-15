// DOM
const tabla = document.querySelector('.tabla')

document.addEventListener('load', () => {
  document.documentElement.style.setproperty('--borde', '20rem')
})

function dibujarTableroHTML() {
  document.getElementById('formValores').addEventListener('submit', e => {
    e.preventDefault()

    // TODO: VALIDAR LOS DATOS
    const ancho = document.getElementById('ancho').value
    const alto = document.getElementById('alto').value

    if ([ancho, alto].includes('')) {
      const error = document.querySelector('.error')
      error.textContent = 'Inserta datos en ambos campos ❗'
      return
    }

    // Añadir css
    tabla.style.cssText += `
      display: grid;
      grid-template-columns:repeat(${ancho}, 1fr);
      grid-template-rows:repeat(${alto}, 1fr);
    `
    // Crear botones
    for (let i = 0; i < ancho * alto; i++) {
      const button = document.createElement('button')
      button.addEventListener('click', () => {
        button.classList.toggle('abierto')
      })
      tabla.appendChild(button)
    }

    document.querySelector('.error').remove()
    e.target.remove()
  })
}

dibujarTableroHTML()
