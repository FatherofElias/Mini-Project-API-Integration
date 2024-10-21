document.addEventListener('DOMContentLoaded', () => {
    fetchPokemonMoves();
});

async function fetchPokemonMoves() {
    const movesContainer = document.getElementById('moves-container');
    movesContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/move');
        const data = await response.json();
        console.log('Fetched moves:', data.results);

        data.results.forEach(async (move) => {
            try {
                const moveResponse = await fetch(move.url);
                const moveData = await moveResponse.json();
                console.log(`Fetched move data for ${move.name}:`, moveData);

                const moveCard = document.createElement('div');
                moveCard.className = 'col-md-4 move-card';
                moveCard.innerHTML = `
                    <h3>${move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h3>
                    <p>Type: ${moveData.type.name}</p>
                    <p>Power: ${moveData.power !== null ? moveData.power : 'N/A'}</p>
                    <p>Accuracy: ${moveData.accuracy !== null ? moveData.accuracy : 'N/A'}</p>
                    <p>Effect: ${moveData.effect_entries.find(entry => entry.language.name === 'en').effect}</p>
                `;
                movesContainer.appendChild(moveCard);
            } catch (error) {
                console.error(`Error fetching data for move ${move.name}:`, error);
            }
        });
    } catch (error) {
        movesContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        console.error('Error fetching Pokémon moves:', error);
    }
}