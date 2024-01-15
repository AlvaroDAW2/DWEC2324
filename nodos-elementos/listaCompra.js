const lista = document.getElementById('lista')
const formLista = document.getElementById('formLista')

formLista.addEventListener('submit', e => {
  e.preventDefault()
  const li = document.createElement('li')
  const input = formLista.querySelector('input')
  li.innerText = input.value
  input.value = null
  lista.appendChild(li)
  ordenarLista()
})

function ordenarLista() {
  const nuevaLista = Array.from(lista.children).sort((a, b) =>
    a.innerText.localeCompare(b.innerText)
  )
  lista.innerHTML = null
  nuevaLista.forEach(li => lista.appendChild(li))
}
