/*
Suponiendo que no se saben el tipo de etiquetas
(para utilizar  ByTagname) Al pulsar h2 obtener el
bloque en el que se imparte y los módulos que se
estudian (extraer el identificador del div superior
y el identificador de cada li)
*/

document.querySelectorAll('h2').forEach(h2 => {
  h2.addEventListener('click', () => {
    document.getElementById('texto').innerText =
      h2.textContent +
      '\nBloque en el que se imparte: ' +
      h2.parentElement.id +
      '\nModulos que se estudian: ' +
      h2.nextElementSibling.childElementCount +
      '\n' +
      Array.from(h2.nextElementSibling.children)
        .reverse()
        .map(child => child.textContent)
  })
})
