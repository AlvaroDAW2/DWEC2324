const keys = ['name', 'life', 'power', 'talk']
const values = [
  'Otto',
  99,
  10,
  function () {
    return 'Hola'
  }
]

const entries = []
for (const i of Object.keys(keys)) {
  const key = keys[i]
  const value = values[i]
  entries.push([key, value])
}

const user = Object.fromEntries(entries)
console.log(user)
