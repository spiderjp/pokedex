//Const virou uma "função" que tem id como parâmetro, no qual retorna a URL
/*
Estamos usando uma template string na URL, 
então podemos substituir o final por uma interpolação de um ID para ficar dinânimo e receber todos os Pokemons 
*/

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`


//Criação de um array para armazenar os pokemons
const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index+1)).then(response => response.json())
)

const generateHTML = pokemons => {
    // Gerar template HTML com as informações dos pokemons, reduzindo o array em uma string por meio do reduce()
    
            return pokemons.reduce((accumulator, {name, id, types}) =>{
    
            const elementsTypes = types.map(typeInfo => typeInfo.type.name)
    
                accumulator+= `
                <li class="card ${elementsTypes[0]}">
                <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
                <h2 class="card-title">${id}. ${name}<h2>
                <p class="card-subtitle">${elementsTypes.join(' | ')}</p>
                </li>
                `
                return accumulator

            }, '')// as aspas '' é o valor inicial do accumulator (string vazia)
        }
    

const insertPokemonsIntoPage =  pokemons =>{
    const ul = document.querySelector('[data-js="pokedex"]')

    //Injetando o template HTML dentro da <ul>

    ul.innerHTML = pokemons
}   


const pokemonPromises = generatePokemonPromises()
Promise.all(pokemonPromises)
.then(generateHTML)
.then(insertPokemonsIntoPage)



/*
DICA: ALT + SETA CIMA ou BAIXA ajuda mover trecho de códigos selecionados
*/