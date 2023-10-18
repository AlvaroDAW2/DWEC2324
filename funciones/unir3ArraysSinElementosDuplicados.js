const miArray1 = [1, 2, 3, 4, 5, 6, 7, 8]
const miArray2 = [1, 2, 3, 8, 9, 0, 43, 45, 65]
const miArray3 = [17, 32, 87, 45]

const arraysJuntosSinDuplicadosSet = new Set([
  ...miArray1,
  ...miArray2,
  ...miArray3
])

const arraysJuntosSinDuplicados = [...arraysJuntosSinDuplicadosSet]
console.log(arraysJuntosSinDuplicados)
console.log(arraysJuntosSinDuplicados instanceof Array)
