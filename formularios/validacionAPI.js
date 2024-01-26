window.addEventListener('load', iniciar)

const form = document.getElementById('miFormulario')

const errores = {
  nombre: {
    valueMissing: '¡Debes poner un nombre!',
    badInput: 'Has rellenado mal el nombre',
    patternMismatch: 'Debes poner un nombre valido (entre 2 y 15 carácteres)'
  },
  edad: {
    valueMissing: '¡Debes poner tu edad!',
    rangeOverflow: '¡Eres muy mayor!',
    rangeUnderflow: '¡Eres demasiado joven!'
  },
  telefono: {
    valueMissing: '¡Debes poner tu telefono!',
    patternMismatch: 'Debes poner un telefono valido (de 9 digitos)'
  }
}

function iniciar() {
  document.getElementById('enviar').addEventListener('click', validar)
}

function validar(e) {
  e.preventDefault()

  if (Array.from(form.elements).every(elemento => validarElemento(elemento))) {
    form.submit()
  }
}

function validarElemento(elemento) {
  limpiarError(elemento)

  if (!elemento.checkValidity()) {
    let mensaje
    for (let key in elemento.validity) {
      if (elemento.validity[key] === true) {
        mensaje = errores[elemento.id][key]
        break
      }
    }
    error(elemento, mensaje)
    return false
  }

  return true
}

function error(elemento, mensaje) {
  document.getElementById('mensajeError').textContent = mensaje
  elemento.classList.add('error')
  elemento.focus()
}

function limpiarError(elemento) {
  elemento.classList.remove('error')
}
