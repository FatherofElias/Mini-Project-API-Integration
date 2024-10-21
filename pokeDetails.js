async function fetchRandomPokemon() {
    const pokemonDetails = document.getElementById('pokemon-details');
    pokemonDetails.innerHTML = ''; 
    const randomId = Math.floor(Math.random() * 898) + 1; 

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();

        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

        pokemonDetails.innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <table class="table table-bordered">
                <tr>
                    <th>ID</th>
                    <td>${data.id}</td>
                </tr>
                <tr>
                    <th>Types</th>
                    <td>${types}</td>
                </tr>
                <tr>
                    <th>Abilities</th>
                    <td>${abilities}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td>${data.height}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${data.weight}</td>
                </tr>
                <tr>
                    <th>Stats</th>
                    <td>${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</td>
                </tr>
            </table>
        `;
    } catch (error) {
        pokemonDetails.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon:', error);
    }
}


document.addEventListener('DOMContentLoaded', fetchRandomPokemon);