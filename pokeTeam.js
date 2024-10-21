document.addEventListener('DOMContentLoaded', () => {
    initializeTeamBuilder();
});

let team = [];

function initializeTeamBuilder() {
    fetchPokemonList();
    setupDropZones();
}

async function fetchPokemonList() {
    const pokemonListContainer = document.getElementById('pokemon-list');
    pokemonListContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); 
        const data = await response.json();
        console.log('Fetched Pokémon list:', data.results);

        data.results.forEach(async (pokemon, index) => {
            const pokemonItem = document.createElement('div');
            pokemonItem.className = 'list-group-item pokemon-item';
            pokemonItem.draggable = true;
            pokemonItem.dataset.index = index;
            const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            
            const spriteResponse = await fetch(pokemon.url);
            const spriteData = await spriteResponse.json();

            pokemonItem.innerHTML = `
                <img src="${spriteData.sprites.front_default}" alt="${pokemonName}" class="pokemon-img">
                ${pokemonName}
            `;

            pokemonItem.addEventListener('dragstart', handleDragStart);

            pokemonListContainer.appendChild(pokemonItem);
        });
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

function setupDropZones() {
    const teamContainer = document.getElementById('team-container');
    const pokemonListContainer = document.getElementById('pokemon-list');

    teamContainer.addEventListener('dragover', handleDragOver);
    teamContainer.addEventListener('drop', handleDropInTeam);

    pokemonListContainer.addEventListener('dragover', handleDragOver);
    pokemonListContainer.addEventListener('drop', handleDropInList);
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

function handleDropInTeam(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    const index = event.dataTransfer.getData('text/plain');
    addPokemonToTeam(index);
}

function handleDropInList(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    const index = event.dataTransfer.getData('text/plain');
    removePokemonFromTeam(index);
}

async function addPokemonToTeam(index) {
    if (team.length >= 6) {
        alert('Your team is full!');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parseInt(index) + 1}`);
        const pokemonData = await response.json();
        console.log('Added Pokémon to team:', pokemonData);

        team.push(pokemonData);
        updateTeamDisplay();
    } catch (error) {
        console.error('Error adding Pokémon to team:', error);
    }
}

function removePokemonFromTeam(index) {
    team.splice(index, 1);
    updateTeamDisplay();
}

function updateTeamDisplay() {
    const teamContainer = document.getElementById('team-container');
    teamContainer.innerHTML = ''; 

    team.forEach((pokemon, idx) => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'list-group-item pokemon-card';
        pokemonCard.draggable = true;
        pokemonCard.dataset.index = idx;
        pokemonCard.innerHTML = `
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <button class="btn btn-danger" onclick="removePokemonFromTeam(${idx})">Remove</button>
        `;
        pokemonCard.addEventListener('dragstart', handleDragStart);
        teamContainer.appendChild(pokemonCard);
    });
}