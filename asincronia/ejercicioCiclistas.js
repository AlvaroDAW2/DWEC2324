const mensajes = document.getElementById('mensajes')
const INTERVALO = 5000
const CRONOMETRO = 3
const NUMERO_CICLISTAS = 25

function esperar(tiempo) {
  return new Promise(resolve => setTimeout(resolve, tiempo))
}

window.addEventListener('load', async () => {
  for (let i = 1; i <= NUMERO_CICLISTAS; i++) await salirCiclista(i)
  mensajes.textContent = 'Todos los ciclistas han salido de la meta'
})

function salirCiclista(ciclista) {
  mensajes.textContent = `Dorsal ${ciclista} ${CRONOMETRO}`
  cronometroCiclista(ciclista)
  return esperar(INTERVALO)
}

async function cronometroCiclista(ciclista) {
  for (let i = CRONOMETRO; i >= 0; i--) {
    mensajes.textContent = `Dorsal ${ciclista} ${i}`
    await esperar(1000)
  }
  mensajes.textContent = `Dorsal ${ciclista} ¡YA!`
}
