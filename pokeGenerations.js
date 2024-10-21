document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonGenerations();
});

async function fetchPokemonGenerations() {
    const generationsContainer = document.getElementById('generations-container');
    generationsContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/generation');
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon generations');
        }
        const data = await response.json();
        console.log('Fetched generations:', data.results);

        data.results.forEach(async (generation) => {
            try {
                const generationResponse = await fetch(generation.url);
                if (!generationResponse.ok) {
                    throw new Error(`Failed to fetch generation data for ${generation.name}`);
                }
                const generationData = await generationResponse.json();
                console.log(`Fetched generation data for ${generation.name}:`, generationData);

                const generationCard = document.createElement('div');
                generationCard.className = 'col-md-4 generation-card';
                generationCard.innerHTML = `
                    <h3>${generation.name.charAt(0).toUpperCase() + generation.name.slice(1)}</h3>
                    <p>Generation ${generationData.id}</p>
                    <button class="btn btn-primary" onclick="filterPokemonByGeneration(${generationData.id})">Explore Pokémon</button>
                `;
                generationsContainer.appendChild(generationCard);
            } catch (error) {
                console.error(`Error fetching data for generation ${generation.name}:`, error);
            }
        });
    } catch (error) {
        generationsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon generations:', error);
    }
}

async function filterPokemonByGeneration(generationId) {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokémon for Generation ${generationId}`);
        }
        const data = await response.json();
        console.log(`Fetched Pokémon for Generation ${generationId}:`, data.pokemon_species);

        data.pokemon_species.forEach(async (pokemon) => {
            try {
                const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                if (!pokemonResponse.ok) {
                    throw new Error(`Failed to fetch data for Pokémon ${pokemon.name}`);
                }
                const pokemonData = await pokemonResponse.json();
                console.log(`Fetched Pokémon data for ${pokemon.name}:`, pokemonData);

                const pokemonCard = document.createElement('div');
                pokemonCard.className = 'col-md-4 pokemon-card';
                pokemonCard.innerHTML = `
                    <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                    <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                `;
                pokemonContainer.appendChild(pokemonCard);
            } catch (error) {
                console.error(`Error fetching data for Pokémon ${pokemon.name}:`, error);
            }
        });
    } catch (error) {
        pokemonContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error(`Error fetching Pokémon for Generation ${generationId}:`, error);
    }
}