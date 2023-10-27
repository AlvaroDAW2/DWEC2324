function esBisiesto(n) {
  // return (n % 100 === 0 ? n % 400 === 0 : n % 4 === 0) ? 1 : 0
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0) ? 1 : 0
}

console.log(esBisiesto(2000)) // 1
