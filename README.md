# Pokémon Explorer

Welcome to Pokémon Explorer! This web application allows users to explore and learn about Pokémon, their types, abilities, moves, and more. Users can also build and customize their own Pokémon teams. The application leverages the PokeAPI to fetch and display Pokémon data dynamically.

## Features

- **Homepage/Search Page**: A visually appealing landing page with a Search Bar to Explore different Pokemon Characters.
- **Pokémon Types Page**: Categorizes Pokémon based on their types and displays them in an organized manner.
- **Pokémon Abilities Page**: Lists different Pokémon abilities along with detailed descriptions.
- **Pokémon Moves Page**: Showcases various Pokémon moves, including their names, types, power, accuracy, and effects.
- **Pokémon Generation Page**: Displays Pokémon from specific generations and allows users to explore them.
- **Pokémon Team Builder**: Allows users to assemble and customize their Pokémon teams with drag-and-drop functionality.
- **Pokémon Battle Simulator**: The Pokémon Battle Simulator allows users to create their own Pokémon teams and simulate battles. Users can select Pokémon for their team, choose moves during battles, and see the outcome based on Pokémon stats and move effectiveness.

## Pages and Functionality

### Homepage/Search Page

The landing page of the application, featuring a Bootstrap navbar and a jumbotron with a searchbar exploring Pokémon.

### Pokémon Types Page 

Displays a list of Pokémon categorized by their types. Each type category shows a sample of Pokémon belonging to that type.

- **HTML**: Sets up the structure of the types page.
- **CSS** (pokeTypes.css): Styles the page to differentiate Pokémon types.
- **JavaScript** (pokeTypes.js): Fetches type data from the PokeAPI and displays it on the page.

### Pokémon Abilities Page

Lists different Pokémon abilities and provides detailed descriptions for each ability.

- **HTML**: Sets up the structure of the abilities page.
- **CSS** (pokeAbilities.css): Styles the page to present the abilities neatly.
- **JavaScript** (pokeAbilities.js): Fetches ability data from the PokeAPI and displays it on the page.

### Pokémon Moves Page

Showcases various Pokémon moves, including their names, types, power, accuracy, and effects.

- **HTML**: Sets up the structure of the moves page.
- **CSS** (pokeMoves.css): Styles the page to present the moves neatly.
- **JavaScript** (pokeMoves.js): Fetches move data from the PokeAPI and displays it on the page.

### Pokémon Generation Page 

Displays Pokémon from specific generations and allows users to explore them within each generation.

- **HTML**: Sets up the structure of the generations page.
- **CSS** (pokeGenerations.css): Styles the page to present the generations neatly.
- **JavaScript** (pokeGenerations.js): Fetches generation data from the PokeAPI and displays it on the page. Filters and displays Pokémon based on the selected generation.

### Pokémon Team Builder 

Allows users to assemble and customize their Pokémon teams. Users can drag and drop Pokémon to add them to their team and remove them with a button click.

- **HTML**: Sets up the structure of the team builder page.
- **CSS** (pokeTeam.css): Styles the page to present the Pokémon list and team neatly.
- **JavaScript** (pokeTeam.js): Fetches Pokémon data, implements drag-and-drop functionality, and manages the team 

### Pokémon Battle Simulator

- **Select Pokémon**: Users can choose Pokémon for both their team and the opponent's team.
- **Choose Moves**: During battles, users can select moves for their Pokémon to use.
- **Simulate Battles**: The simulator calculates damage based on Pokémon stats and moves, and determines the winner when all Pokémon on one team are defeated.

- Technologies Used
- **HTML**: Structure of the web pages.
- **CSS**: Styling of the web pages.
- **JavaScript**: Functionality and interactivity.
- **Bootstrap**: Responsive design and layout.
