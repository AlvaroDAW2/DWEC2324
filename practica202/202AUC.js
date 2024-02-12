// Referencias HTML
const formulario = document.getElementById('formulario')
const cursoAcademico = document.getElementById('cursoAcademico')
const opcionAñadir = document.querySelector('option[value=añadir]')
const todosDias = document.getElementById('todosDias')
const diasDisponibilidad = Array.from(
  document.getElementsByName('diaDisponibilidad')
) // lo convierto a Array con Array.from para luego poder usar la lista de nodos (NodeList) como si fuese un array y usar programación funcional
const mensaje = document.getElementById('mensaje')
const contadorMensaje = document.getElementById('contadorMensaje')
const nif = document.getElementById('nif')

// CONSTANTES
const NUM_MAX_CARACTERES_MENSAJE = 500
const NUM_MIN_CARACTERES_MENSAJE = 2

window.addEventListener('load', Inicio)

function Inicio() {
  formulario.addEventListener('submit', enviarFormulario)
  document.getElementById('irGoogle').addEventListener('click', irAGoogle)
  cursoAcademico.addEventListener('change', anadirCursoAcademico)
  todosDias.addEventListener('change', checkDiasPreferentes)
  mensaje.addEventListener('invalid', e =>
    e.target.setCustomValidity(
      `Por favor, ingresa un mensaje entre ${NUM_MIN_CARACTERES_MENSAJE} y ${NUM_MAX_CARACTERES_MENSAJE} carácteres`
    )
  )
  mensaje.addEventListener('input', logicaContadorMensaje)
}

function enviarFormulario(e) {
  e.preventDefault()
  if (validarMensaje() && validarNIF() && validarDiasPreferentes()) {
    const confirmar = confirm('¿Quieres enviar el formulario?')
    if (confirmar) e.target.submit()
  }
}

function validarMensaje() {
  return mensaje.checkValidity()
}

function validarNIF() {
  limpiarError('nif')
  // Array de letras aceptadas para un NIF Personal (DNI), excluyo la ñ
  const letrasAceptadas = [
    'T',
    'R',
    'W',
    'A',
    'G',
    'M',
    'Y',
    'F',
    'P',
    'D',
    'X',
    'B',
    'N',
    'J',
    'Z',
    'S',
    'Q',
    'V',
    'H',
    'L',
    'C',
    'K',
    'E'
  ]
  const numeros = nif.value.substring(0, nif.value.length - 1)
  const letra = nif.value.substring(nif.value.length - 1, nif.value.length)
  if (
    isNaN(numeros) ||
    letrasAceptadas[numeros % 23] !== letra ||
    numeros.toString().length !== 8
  ) {
    document.getElementById('error-nif').textContent =
      'Por favor escribe un NIF Personal válido'
    return false
  }

  return true
}

function validarDiasPreferentes() {
  limpiarError('diasDisponibilidad')
  const diasDisponibilidadElegidos = diasDisponibilidad.filter(
    diaDisponibilidad => diaDisponibilidad.checked
  ).length
  if (diasDisponibilidadElegidos < 2) {
    document.getElementById('error-diasDisponibilidad').textContent =
      'Por favor elige al menos 2 días con disponibilidad'
    return false
  }

  return true
}

function irAGoogle() {
  window.open('https://www.google.es', '_blank')
}

function anadirCursoAcademico(e) {
  if (e.target.value !== 'añadir') return

  const nuevaOpcionCursoAcademico = document.createElement('option')
  const nuevoCursoAcademico = prompt(
    'Escribe el curso académico que quieres añadir'
  )
  nuevaOpcionCursoAcademico.textContent = nuevoCursoAcademico
  nuevaOpcionCursoAcademico.value = nuevoCursoAcademico
  cursoAcademico.insertBefore(nuevaOpcionCursoAcademico, opcionAñadir)
}

function checkDiasPreferentes(e) {
  const checked = e.target.checked
  diasDisponibilidad.forEach(diaPreferente => {
    diaPreferente.checked = checked
  })
}

function logicaContadorMensaje(e) {
  const caracteres = e.target.value.length
  const diferencia = NUM_MAX_CARACTERES_MENSAJE - caracteres

  contadorMensaje.textContent = diferencia
}

function limpiarError(elemento) {
  document.getElementById(`error-${elemento}`).textContent = ''
}
