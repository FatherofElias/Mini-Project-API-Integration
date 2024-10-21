document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonAbilities();
});

async function fetchPokemonAbilities() {
    const abilitiesContainer = document.getElementById('abilities-container');
    abilitiesContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/ability');
        const data = await response.json();
        console.log('Fetched abilities:', data.results);

        data.results.forEach(async (ability) => {
            try {
                const abilityResponse = await fetch(ability.url);
                const abilityData = await abilityResponse.json();
                console.log(`Fetched ability data for ${ability.name}:`, abilityData);

                const description = abilityData.effect_entries.find(entry => entry.language.name === 'en').effect;

                const abilityCard = document.createElement('div');
                abilityCard.className = 'col-md-4 ability-card';
                abilityCard.innerHTML = `
                    <h3>${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</h3>
                    <p>${description}</p>
                `;
                abilitiesContainer.appendChild(abilityCard);
            } catch (error) {
                console.error(`Error fetching data for ability ${ability.name}:`, error);
            }
        });
    } catch (error) {
        abilitiesContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon abilities:', error);
    }
}