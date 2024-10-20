async function fetchPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();

        data.results.forEach(async (pokemon) => {
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'col-md-4 pokemon-card';
            pokemonCard.innerHTML = `
                <h3>${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h3>
                <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                <p>Height: ${pokeData.height}</p>
                <p>Weight: ${pokeData.weight}</p>
            `;
            pokemonContainer.appendChild(pokemonCard);
        });
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}