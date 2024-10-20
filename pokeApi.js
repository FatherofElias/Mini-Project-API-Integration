document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const pokemonInput = document.getElementById('pokemon-input').value.trim().toLowerCase();
        fetchPokemonData(pokemonInput);
    });
});

async function fetchPokemonData(query) {
    const pokemonInfo = document.getElementById('pokemon-info');
    pokemonInfo.innerHTML = ''; // Clear previous content

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-info-card';
        pokemonCard.innerHTML = `
            <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>ID: ${data.id}</p>
            <p>Height: ${data.height}</p>
            <p>Weight: ${data.weight}</p>
        `;
        pokemonInfo.appendChild(pokemonCard);
    } catch (error) {
        pokemonInfo.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon:', error);
    }
}