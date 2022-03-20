const promises = [];
for (let i = 1; i <= 99; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  promises.push(fetch(url).then((resp) => resp.json()));
}

Promise.all(promises).then((data) => {
  console.log(data);
  generatePokemons(data);
});

const generatePokemons = (data) => {
  const container = document.querySelector(".container");
  const wrapper = document.createElement("div");

  wrapper.classList.add("wrapper");

  for (let i = 0; i < data.length; i++) {
    const pokemonWrapper = document.createElement("div");
    const pokemonName = document.createElement("h2");
    const pokemonImg = document.createElement("img");
    const pokemonImgBack = document.createElement("img");
    const pokemonTypes = document.createElement("p");
    const showStats = document.createElement("button");
    let showStatsMassive = document.querySelectorAll(".stats-btn");
    // inside stats
    const pokemonStats = document.createElement("div");
    const pokemonAbilityName = document.createElement("h2");
    const pokemonAbilities = document.createElement("p");
    const stats = document.createElement("div");
    const statHp = document.createElement("div");
    const statAttack = document.createElement("div");
    const statDefense = document.createElement("div");
    const statSpAttack = document.createElement("div");
    const statSpDefense = document.createElement("div");
    const statSpeed = document.createElement("div");
    const hideStats = document.createElement("button");
    let hideStatsMassive = document.querySelectorAll(".hide-stats-btn");

    pokemonWrapper.classList.add("pokemon-wrapper");
    pokemonTypes.classList.add("pokemon-types");
    stats.classList.add("stats-wrapper");
    statHp.classList.add("char-stats");
    statAttack.classList.add("char-stats");
    statDefense.classList.add("char-stats");
    statSpAttack.classList.add("char-stats");
    statSpDefense.classList.add("char-stats");
    statSpeed.classList.add("char-stats");
    pokemonImgBack.classList.add("back-img");

    showStats.classList.add("stats-btn");
    pokemonStats.classList.add("pokemon-stats");
    hideStats.classList.add("hide-stats-btn");
    statHp.innerText =
      data[i].stats[0].stat.name + ": " + data[i].stats[0].base_stat;
    statAttack.innerText =
      data[i].stats[1].stat.name + ": " + data[i].stats[1].base_stat;
    statDefense.innerText =
      data[i].stats[2].stat.name + ": " + data[i].stats[2].base_stat;
    statSpAttack.innerText =
      data[i].stats[3].stat.name + ": " + data[i].stats[3].base_stat;
    statSpDefense.innerText =
      data[i].stats[4].stat.name + ": " + data[i].stats[4].base_stat;
    statSpeed.innerText =
      data[i].stats[5].stat.name + ": " + data[i].stats[5].base_stat;
    pokemonName.innerText = data[i].name;
    pokemonImg.setAttribute("src", data[i].sprites.front_default);
    pokemonImgBack.setAttribute("src", data[i].sprites.back_default);
    pokemonTypes.innerText =
      "Types: " + data[i].types.map((type) => type.type.name).join(", ");
    // stats.

    showStats.innerText = "Stats";
    pokemonAbilityName.innerText = "Abilities";
    pokemonAbilities.innerText =
      "Abilities: " +
      data[i].abilities.map((ability) => ability.ability.name).join(", ");
    hideStats.innerText = "Main";

    //Asigns show stats functuion to every .stats-btn (for its own parent div)
    for (let j = 0; j < showStatsMassive.length; j++) {
      let pokemonStatsMassive = document.querySelectorAll(".pokemon-stats");
      showStatsMassive[j].addEventListener(
        "click",
        function (index) {
          pokemonStatsMassive[j].style.display = "flex";
        }.bind(this, j)
      );
    }
    //Asigns hide stats function to every .hide-stats-btn (for its own parent div)
    for (let j = 0; j < hideStatsMassive.length; j++) {
      let pokemonStatsMassive = document.querySelectorAll(".pokemon-stats");
      hideStatsMassive[j].addEventListener("click", function (index) {
        pokemonStatsMassive[j].style.display = "none";
      });
    }

    pokemonStats.append(
      pokemonAbilityName,
      pokemonAbilities,
      stats,
      pokemonImgBack,
      hideStats
    );
    pokemonWrapper.append(
      pokemonStats,
      pokemonName,
      pokemonImg,
      pokemonTypes,
      showStats
    );
    wrapper.append(pokemonWrapper);
    container.append(wrapper);
    stats.append(
      statHp,
      statAttack,
      statDefense,
      statSpAttack,
      statSpDefense,
      statSpeed
    );
  }
};
