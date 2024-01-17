const lista = document.getElementById('lista')
const formLista = document.getElementById('formLista')

formLista.addEventListener('submit', e => {
  e.preventDefault()
  const li = document.createElement('li')
  const input = formLista.querySelector('input')
  if (!input.value) return
  li.innerText = input.value
  input.value = null

  li.addEventListener('click', () => {
    li.remove()
  })

  lista.appendChild(li)
  ordenarLista()
})

function ordenarLista() {
  const nuevaLista = Array.from(lista.children).sort((a, b) =>
    a.innerText.localeCompare(b.innerText)
  )
  lista.replaceChildren(...nuevaLista)
}
