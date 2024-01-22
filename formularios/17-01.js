const ESTADOS = {
  on: {
    parrafo: 'Máquina encendida',
    submit: 'Apagar máquina'
  },
  off: {
    parrafo: 'Máquina apagada',
    submit: 'Encender máquina'
  }
}

const formulario = document.querySelector('form')
const submit = formulario.querySelector('input[type=submit]')
const parrafo = document.getElementById('maquina')

formulario.addEventListener('submit', e => {
  e.preventDefault()
  if (submit.value === ESTADOS.on.submit) {
    submit.value = ESTADOS.off.submit
    parrafo.textContent = ESTADOS.off.parrafo
  } else {
    submit.value = ESTADOS.on.submit
    parrafo.textContent = ESTADOS.on.parrafo
  }
})
