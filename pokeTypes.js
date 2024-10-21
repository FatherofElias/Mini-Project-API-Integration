document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonTypes();
});

async function fetchPokemonTypes() {
    const typesContainer = document.getElementById('types-container');
    typesContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        console.log('Fetched types:', data.results); 

        data.results.forEach(async (type) => {
            try {
                const typeResponse = await fetch(type.url);
                const typeData = await typeResponse.json();
                console.log(`Fetched type data for ${type.name}:`, typeData); 

                const typeCard = document.createElement('div');
                typeCard.className = `col-md-4 type-card ${type.name}`;
                typeCard.innerHTML = `
                    <h3>${type.name.charAt(0).toUpperCase() + type.name.slice(1)}</h3>
                `;
                typeCard.addEventListener('click', () => {
                    displayPokemonByType(typeData.pokemon);
                });
                typesContainer.appendChild(typeCard);
            } catch (error) {
                console.error(`Error fetching data for type ${type.name}:`, error);
            }
        });
    } catch (error) {
        typesContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon types:', error);
    }
}

function displayPokemonByType(pokemonList) {
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonContainer.innerHTML = ''; 

    pokemonList.slice(0, 10).forEach(async (pokemonEntry) => {
        try {
            const response = await fetch(pokemonEntry.pokemon.url);
            const pokemonData = await response.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'col-md-4 pokemon-list-item';
            pokemonCard.innerHTML = `
                <h4>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h4>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            `;
            pokemonContainer.appendChild(pokemonCard);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    });
}