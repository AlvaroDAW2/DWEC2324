const form = document.querySelector('form')

const url = new URL(document.URL)
const datos = Object.fromEntries(url.searchParams.entries())

if (Object.keys(datos).length) {
  form.remove()
  const info = document.createElement('p')
  info.innerText = Array.from(Object.entries(datos)).map(
    dato => dato[0] + ': ' + dato[1]
  )
  document.body.append(info)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const confirmar = confirm('¿Quieres enviar el formulario?')
  if (confirmar) form.submit()
})

form.addEventListener('reset', () => {
  form.querySelector('input').focus()
})
