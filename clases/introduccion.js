const mensaje = document.getElementById('mensaje')

class Coche {
  constructor(marca) {
    this.marca = marca
  }

  anuncio() {
    return 'Ha llegado el nuevo coche de ' + this.marca
  }
}

class Modelo extends Coche {
  constructor(marca, modelo) {
    super(marca)
    this.modelo = modelo
  }

  anuncioCompleto() {
    return this.anuncio() + ': el modelo ' + this.modelo
  }
}

// const miCoche = new Coche('Toyota')
const miModelo = new Modelo('Nose', 'no se xd')
// mensaje.textContent = miCoche.anuncio()
mensaje.textContent += miModelo.anuncio()
