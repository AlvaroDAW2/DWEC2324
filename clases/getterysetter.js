const mensaje = document.getElementById('mensajes')

class Coche {
  constructor(marca) {
    this._marca = marca
  }

  get marca() {
    return this._marca
  }

  set marca(mar) {
    this._marca = mar
  }
}

const miCoche = new Coche('Toyota')
// mensaje.textContent = miCoche.anuncio()
mensaje.textContent += miCoche.marca
