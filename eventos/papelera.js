const papelera = document.querySelector('.trash')
const IMAGENES_PAPELERA = {
  cerrada:
    'https://cdn.icon-icons.com/icons2/1489/PNG/512/rubbishbin_102620.png',
  abierta: 'https://cdn.icon-icons.com/icons2/1791/PNG/512/trashcan_114640.png'
}
papelera.style.backgroundImage = `url(${IMAGENES_PAPELERA.cerrada})`

papelera.addEventListener('click', function (e) {
  e.target.style.backgroundImage = `url(${IMAGENES_PAPELERA.abierta})`
  setTimeout(() => {
    alert('la papelera se ha vaciado')
  }, 100)
})

document.oncontextmenu = () => false
