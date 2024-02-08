const listaPokemon = document.querySelector('.listaPokemon')

const API_URL = 'https://pokeapi.co/api/v2'

window.addEventListener('load', inicio)

async function inicio() {
  const req = await fetch(`${API_URL}/pokemon?limit=100&offset=0`)
  const pokemons = (await req.json()).results
  pokemons.forEach(pokemon => {
    const pokemonHTML = document.createElement('article')
    pokemonHTML.textContent = pokemon.name
    listaPokemon.appendChild(pokemonHTML)
  })
}
