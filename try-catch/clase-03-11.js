try {
  console.log('Inicio de sentencia de try')

  hola_caracola

  console.log('Fin de sentencias de try (Sí / )')
} catch (error) {
  console.log(error.name)
  console.log(error.message)
  console.log(error.stack)
}
