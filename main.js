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
    // const createDiv = document.createElement('div');

    for(let i = 0; i < data.length; i++){
        const createDiv = document.createElement('div');
        const createHeading = document.createElement('h2');
        const createImg = document.createElement('img');
        createDiv.classList.add('pokemon-wrapper');
        createHeading.innerText = data[i].name;
        
        createImg.setAttribute('src', data[i].sprites.front_default);
        createDiv.append(createHeading, createImg)
        wrapper.append(createDiv);
        container.append(wrapper);
    }
}