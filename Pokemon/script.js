const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const types = document.getElementById('types');
const sprite = document.getElementById('sprite');


searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.toLowerCase();
    let pokemonData;

    try {
      // Attempt to fetch data by name first
      const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`);
      pokemonData = await response.json();

    } catch (error) {
      // If name lookup fails, try ID lookup
      try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}/${searchTerm}`);
        pokemonData = await response.json(); 
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        alert('Pokémon not found.');
        clearPokemonInfo();
        return; 
      }
    }

    // Display Pokémon information
    pokemonName.textContent = pokemonData.name.toUpperCase();
    pokemonId.textContent = `#${pokemonData.id}`;
    weight.textContent = ` ${pokemonData.weight / 10}`; 
    height.textContent = ` ${pokemonData.height / 10} m`;
    hp.textContent = pokemonData.stats[0].base_stat;
    attack.textContent = pokemonData.stats[1].base_stat;
    defense.textContent = pokemonData.stats[2].base_stat;
    specialAttack.textContent = pokemonData.stats[3].base_stat;
    specialDefense.textContent = pokemonData.stats[4].base_stat;
    speed.textContent = pokemonData.stats[5].base_stat;
    sprite.src = pokemonData.sprites.front_default;

    // Clear and populate types
    types.innerHTML = ''; // Clear existing types
    pokemonData.types.forEach(type => {
      const typeElement = document.createElement('span');
      typeElement.textContent = type.type.name.toUpperCase() + ' ';
      types.appendChild(typeElement);
    });

    pokemonInfo.style.display = 'block'; 
  });

function clearPokemonInfo() {
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
    types.innerHTML = '';
    sprite.src = '';
    pokemonInfo.style.display = 'none';
  }
