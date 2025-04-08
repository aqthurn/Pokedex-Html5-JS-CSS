


const url ='https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}';
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')
const limit = 5
let offset = 0;


const maxRecords = 151




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])  => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class ="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                
                </ol>
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
        </div>

        </li>   
    `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordNexpage = offset + limit

    if(qtdRecordNexpage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
}   else {
        loadPokemonItens(offset, limit)
    }
    

   
    
})


pokeApi.getPokemons().then((pokemons = [])  => { 
    
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML = newHtml
    })
