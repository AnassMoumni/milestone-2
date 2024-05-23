//invoer voor eindgebruiker
import * as readline from 'readline-sync';

//Interfaces gebruiken
import { Pokemon, Ability } from './interfaces';

// Lees de inhoud van Pokemon.json en Abilities.json
const pokemonData = "https://raw.githubusercontent.com/AnassMoumni/TerminalApp/main/pokemon.json";
const abilitiesData = "https://raw.githubusercontent.com/AnassMoumni/TerminalApp/main/abilities.json";

//Console App
console.log('Welcome to the JSON data viewer!');
let indexChoice : number 

do {
    const choices : string[] = ["View all data", "Filter by ID", "Exit"];
    indexChoice = readline.keyInSelect(choices, "Choose an option:");
    switch (indexChoice) {
        case 0:
            viewAllData();
            break;
        case 1:
            FilterOnID();
            break;
        case 2:
            console.log("Exiting the application...");
            break;
        default:
            console.log("Invalid choice.");
            break;
    }
} while (indexChoice>3 );


// Functie om alle Pokémon-data weer te geven
async function viewAllData() {
    try {

        const pokemonResponse = await fetch(pokemonData);
        const pokemonParsed : Pokemon[] = await pokemonResponse.json();
        console.log("You chose to view all Pokémon.");

        for (const pokemonData of pokemonParsed) {
            console.log(`- ${pokemonData.name} (${pokemonData.id})`);
        }
    } 
    catch (error: any) {
        console.log(error);
    }
    
}

// Functie om te filteren op id
async function FilterOnID() {

    try {
        console.log("You chose to filter by id.");

        const pokemonResponse = await fetch(pokemonData);
        const pokemonParsed : Pokemon[] = await pokemonResponse.json();
        let filterid: number= Number(readline.question("Please enter the ID you want to filter by:"));
        const filteredPokemon: Pokemon | undefined = pokemonParsed.find(pokemon => pokemon.id === filterid);

    if (filteredPokemon) {
        console.log(`- ${filteredPokemon.name} (${filteredPokemon.id})`);
        console.log(`  - Description: ${filteredPokemon.description}`);
        console.log(`  - Height: ${filteredPokemon.height}`);
        console.log(`  - is Caught: ${filteredPokemon.isCaught}`);
        console.log(`  - Catchdate: ${filteredPokemon.catchDate}`);
        console.log(`  - Image: ${filteredPokemon.imageUrl}`);
        console.log(`  - Types: ${filteredPokemon.types.join(', ')}`);
        filteredPokemon.abilities.forEach(ability => {
            console.log(`  - Ability: ${ability.name}`);
            console.log(`      - Description: ${ability.description}`);
            console.log(`      - Ability URL: ${ability.imageUrl}`);
            console.log(`      - Hidden: ${ability.isHidden}`);
        });
    } 
    else {
        console.log(`No Pokémon found with ID: ${filterid}`);
    }
    } catch (error: any) {
        console.log(error);
    }
    
}

export{}