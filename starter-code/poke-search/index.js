const API_URL = "https://pokeapi.co/api/v2/pokemon";

function renderPokemon(name, sprite) {
  const nameH3 = document.querySelector("#name");
  nameH3.textContent = name;

  const spriteImg = document.querySelector("#sprite");
  spriteImg.src = sprite;
  spriteImg.alt = `sprite for ${name}`;
}

document.querySelector("#poke-search").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = event.target.pokemonId.value;
  // fetch a pokemon
  // display it using the renderPokemon function
});

// example using the renderPokemon function
renderPokemon(
  "charmander",
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
);
