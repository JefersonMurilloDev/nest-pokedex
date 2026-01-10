const API_URL = '/api/v2/pokemon?limit=50';
const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon';

document.addEventListener('DOMContentLoaded', () => {
  fetchPokemons();
});

async function fetchPokemons() {
  const grid = document.getElementById('pokedex-grid');
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // data.results should contain the list of pokemon
    data.forEach(pokemon => {
      const card = createCard(pokemon);
      grid.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    grid.innerHTML = '<p>Error cargando Pokémon. Asegúrate de que la API esté corriendo.</p>';
  }
}

function createCard(pokemon) {
  // pokemon object structure from our API: { name: string, no: number }
  const card = document.createElement('div');
  card.className = 'card';
  
  // Construct image URL based on Pokemon Number "no"
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.no}.png`;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <span class="card-number">#${pokemon.no}</span>
        <img src="${imageUrl}" alt="${pokemon.name}" loading="lazy">
        <h2 class="card-name">${pokemon.name}</h2>
      </div>
      <div class="card-back">
        <h3>Detalles</h3>
        <div class="details-content loading">Cargando datos...</div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => flipCard(card, pokemon.name));

  return card;
}

async function flipCard(cardElement, pokemonName) {
  // Toggle flip class
  cardElement.classList.toggle('is-flipped');

  // If we are flipping to the back and haven't loaded details yet
  if (cardElement.classList.contains('is-flipped')) {
    const detailsContainer = cardElement.querySelector('.details-content');
    
    // Check if we already loaded it (not having 'loading' class is a proxy, or check content)
    if (detailsContainer.classList.contains('loading')) {
      try {
        const details = await fetchPokemonDetails(pokemonName);
        renderDetails(detailsContainer, details);
        detailsContainer.classList.remove('loading');
      } catch (error) {
        detailsContainer.innerHTML = 'Error cargando detalles.';
      }
    }
  }
}

async function fetchPokemonDetails(name) {
  // Fetch from official PokeAPI for details not in our DB
  const response = await fetch(`${POKEAPI_BASE}/${name}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

function renderDetails(container, data) {
  // Extract types
  const typesHtml = data.types.map(t => 
    `<span class="type-badge">${t.type.name}</span>`
  ).join('');

  // Extract abilities
  const abilities = data.abilities.map(a => a.ability.name).join(', ');

  // Extract stats
  const hp = data.stats.find(s => s.stat.name === 'hp').base_stat;
  const attack = data.stats.find(s => s.stat.name === 'attack').base_stat;
  const defense = data.stats.find(s => s.stat.name === 'defense').base_stat;

  container.innerHTML = `
    <div style="margin-bottom: 1rem;">${typesHtml}</div>
    <ul class="stats-list">
      <li><span>HP:</span> <strong>${hp}</strong></li>
      <li><span>Ataque:</span> <strong>${attack}</strong></li>
      <li><span>Defensa:</span> <strong>${defense}</strong></li>
    </ul>
    <p><strong>Habilidades:</strong><br> ${abilities}</p>
  `;
}
