// DOM elements
const inputPokemon = document.getElementById("inputPokemon");
const btnSearch = document.getElementById("btnSearch");
const pokemonInfo = document.getElementById("pokemonInfo");

// Função para renderizar os dados do Pokémon
function renderPokemon(data) {
  const types = data.types.map(t => t.type.name).join(", ");
  const abilities = data.abilities.map(a => a.ability.name).join(", ");
  
  const statsHTML = data.stats.map(s => `
    <li>${s.stat.name}: ${s.base_stat}</li>
  `).join("");

  pokemonInfo.innerHTML = `
    <div class="pokemon-card">
      <h2>${data.name} (#${data.id})</h2>
      <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}" />
      <ul>
        <li><strong>Height:</strong> ${data.height / 10} m</li>
        <li><strong>Weight:</strong> ${data.weight / 10} kg</li>
        <li><strong>Types:</strong> ${types}</li>
        <li><strong>Abilities:</strong> ${abilities}</li>
      </ul>
      <ul class="stats-list">
        ${statsHTML}
      </ul>
    </div>
  `;
}

// Função para buscar o Pokémon na API
async function getPokemonData(pokemon) {
  const query = pokemon.trim().toLowerCase();
  if (!query) {
    pokemonInfo.innerHTML = `<p>Por favor, digite um nome ou número válido.</p>`;
    return;
  }
  pokemonInfo.innerHTML = `<p>Carregando...</p>`;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error("Pokémon não encontrado!");
    const data = await response.json();
    renderPokemon(data);
  } catch (error) {
    pokemonInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

// Event listeners
btnSearch.addEventListener("click", () => {
  getPokemonData(inputPokemon.value);
});

inputPokemon.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getPokemonData(inputPokemon.value);
  }
});
