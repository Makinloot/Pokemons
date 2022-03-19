const promises = [];
for(let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push( fetch(url).then((resp) => resp.json()));
}

Promise.all(promises).then( data => {
    console.log(data);
    generatePokemons(data);

})

const generatePokemons = (data) => {
    const container = document.querySelector('.container');
    const wrapper = document.createElement('div');

    wrapper.classList.add('wrapper');
    
    for(let i = 0; i < data.length; i++){
        const pokemonWrapper = document.createElement('div');
        const pokemonName = document.createElement('h2');
        const pokemonImg = document.createElement('img');
        const pokemonTypes = document.createElement('p');
        const pokemonStats = document.createElement('div');
        const showStats = document.createElement('button');
        let showStatsMassive = document.querySelectorAll('.stats-btn');
        // inside stats
        const pokemonAbilityName = document.createElement('h2');
        const pokemonAbilities = document.createElement('p');
        const hideStats = document.createElement('button');
        let hideStatsMassive = document.querySelectorAll('.hide-stats-btn');


        pokemonWrapper.classList.add('pokemon-wrapper');
        pokemonTypes.classList.add('pokemon-types');
        showStats.classList.add('stats-btn');
        pokemonStats.classList.add('pokemon-stats');
        hideStats.classList.add('hide-stats-btn');

        pokemonName.innerText = data[i].name;
        pokemonImg.setAttribute('src', data[i].sprites.front_default);
        pokemonTypes.innerText = 'Types: ' + data[i].types.map( (type) => type.type.name).join(', ');
        showStats.innerText = 'Stats';
        pokemonAbilityName.innerText = 'Abilities';
        pokemonAbilities.innerText = 'Abilities: ' + data[i].abilities.map( (ability) => ability.ability.name).join(', ');
        hideStats.innerText = 'Main';

        //Asigns show stats functuion to every .stats-btn (for its own parent div)
        for(let j = 0; j < showStatsMassive.length; j++){
            let pokemonStatsMassive = document.querySelectorAll('.pokemon-stats');
            showStatsMassive[j].addEventListener('click', function(index){
                pokemonStatsMassive[j].style.display = 'flex';
            }.bind(this, j));
        };
        //Asigns hide stats function to every .hide-stats-btn (for its own parent div)
        for(let j = 0; j < hideStatsMassive.length; j++){
            let pokemonStatsMassive = document.querySelectorAll('.pokemon-stats');
            hideStatsMassive[j].addEventListener('click', function(index){
                pokemonStatsMassive[j].style.display = 'none';
            })
        }

        pokemonStats.append(pokemonAbilityName, pokemonAbilities , hideStats);
        pokemonWrapper.append(pokemonStats, pokemonName, pokemonImg, pokemonTypes, showStats);
        wrapper.append(pokemonWrapper);
        container.append(wrapper);

    }
};