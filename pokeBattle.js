document.addEventListener('DOMContentLoaded', () => {
    initializeBattleSimulator();
});

let allPokemon = [];
let yourTeam = [];
let opponentTeam = [];
let currentYourPokemonIndex = 0;
let currentOpponentPokemonIndex = 0;

function initializeBattleSimulator() {
    fetchAllPokemon();
    document.getElementById('start-battle').addEventListener('click', startBattle);
}

async function fetchAllPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); 
        const data = await response.json();
        allPokemon = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        populatePokemonSelection();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return response.json();
}

function populatePokemonSelection() {
    const yourTeamSelection = document.getElementById('your-team-selection');
    const opponentTeamSelection = document.getElementById('opponent-team-selection');

    for (let i = 0; i < 3; i++) {
        const yourSelect = createPokemonSelect(`your-pokemon-${i}`);
        const opponentSelect = createPokemonSelect(`opponent-pokemon-${i}`);
        yourTeamSelection.appendChild(yourSelect);
        opponentTeamSelection.appendChild(opponentSelect);
    }
}

function createPokemonSelect(id) {
    const select = document.createElement('select');
    select.id = id;
    select.className = 'form-select mb-2';
    select.innerHTML = allPokemon.map(pokemon => `<option value="${pokemon.name}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</option>`).join('');
    return select;
}

function startBattle() {
    const battleLog = document.getElementById('battle-log');
    battleLog.innerHTML = '';

    yourTeam = getSelectedPokemon('your-pokemon');
    opponentTeam = getSelectedPokemon('opponent-pokemon');

    if (yourTeam.length === 0 || opponentTeam.length === 0) {
        alert('Please select Pokémon for both teams.');
        return;
    }

    displayTeams();
    currentYourPokemonIndex = 0;
    currentOpponentPokemonIndex = 0;
    displayMoveSelection();
}

function getSelectedPokemon(prefix) {
    const selectedPokemon = [];
    for (let i = 0; i < 3; i++) {
        const select = document.getElementById(`${prefix}-${i}`);
        const pokemonName = select.value;
        const pokemon = allPokemon.find(p => p.name === pokemonName);
        if (pokemon) {
            selectedPokemon.push(pokemon);
        }
    }
    return selectedPokemon;
}

function displayTeams() {
    const yourTeamContainer = document.getElementById('your-team');
    const opponentTeamContainer = document.getElementById('opponent-team');
    yourTeamContainer.innerHTML = '';
    opponentTeamContainer.innerHTML = '';

    yourTeam.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        yourTeamContainer.appendChild(pokemonCard);
    });

    opponentTeam.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        opponentTeamContainer.appendChild(pokemonCard);
    });
}

function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'list-group-item pokemon-card';
    pokemonCard.innerHTML = `
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
    `;
    return pokemonCard;
}

function displayMoveSelection() {
    const moveSelection = document.getElementById('move-selection');
    moveSelection.innerHTML = '';

    const yourPokemon = yourTeam[currentYourPokemonIndex];
    const moveSelect = document.createElement('select');
    moveSelect.id = 'move-select';
    moveSelect.className = 'form-select mb-2';
    moveSelect.innerHTML = yourPokemon.moves.map(move => `<option value="${move.move.name}">${move.move.name}</option>`).join('');
    moveSelection.appendChild(moveSelect);

    const moveButton = document.createElement('button');
    moveButton.className = 'btn btn-primary';
    moveButton.textContent = 'Use Move';
    moveButton.addEventListener('click', () => useMove(moveSelect.value));
    moveSelection.appendChild(moveButton);
}

function useMove(moveName) {
    const battleLog = document.getElementById('battle-log');
    const yourPokemon = yourTeam[currentYourPokemonIndex];
    const opponentPokemon = opponentTeam[currentOpponentPokemonIndex];

    const yourMove = yourPokemon.moves.find(move => move.move.name === moveName);
    const opponentMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];

    const yourDamage = calculateDamage(yourPokemon, opponentPokemon, yourMove);
    const opponentDamage = calculateDamage(opponentPokemon, yourPokemon, opponentMove);

    opponentPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat -= yourDamage;
    yourPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat -= opponentDamage;

    battleLog.innerHTML += `<p>${yourPokemon.name} used ${yourMove.move.name} and dealt ${yourDamage} damage!</p>`;
    battleLog.innerHTML += `<p>${opponentPokemon.name} used ${opponentMove.move.name} and dealt ${opponentDamage} damage!</p>`;

    if (opponentPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat <= 0) {
        battleLog.innerHTML += `<p>${opponentPokemon.name} fainted!</p>`;
        currentOpponentPokemonIndex++;
        if (currentOpponentPokemonIndex >= opponentTeam.length) {
            battleLog.innerHTML += `<p>All opponent Pokémon fainted! You win!</p>`;
            return;
        }
    }

    if (yourPokemon.stats.find(stat => stat.stat.name === 'hp').base_stat <= 0) {
        battleLog.innerHTML += `<p>${yourPokemon.name} fainted!</p>`;
        currentYourPokemonIndex++;
        if (currentYourPokemonIndex >= yourTeam.length) {
            battleLog.innerHTML += `<p>All your Pokémon fainted! You lose!</p>`;
            return;
        }
    }

    displayMoveSelection();
}

function calculateDamage(attacker, defender, move) {
    const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const basePower = move.move.power || 50; 

    const damage = ((2 * 50 / 5 + 2) * basePower * (attackStat / defenseStat)) / 50 + 2;
    return Math.floor(damage);
}