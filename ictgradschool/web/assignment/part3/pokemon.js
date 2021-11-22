/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";

/* Must add the first addEventListener when you want to move internal JS script to external!!! */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.navigation_hamburger').addEventListener('click', function () {
        document.querySelectorAll('.right_nav').forEach(nav => nav.classList.toggle('navigation_tray_reveal'));
    });
});

window.addEventListener("load", function () {
    displayRandomPokemon();

    async function displayRandomPokemon() {
        let randomPokemonObj = await fetch("https://trex-sandwich.com/pokesignment/pokemon?random=random");
        let randomPokemonJsonObj = await randomPokemonObj.json();
        const poke_day = document.querySelector("#poke_day");
         poke_day.innerHTML = '';
        poke_day.innerHTML = `            <h5>Pokemon of the day</h5>
                                <div id="poke_day_img">
                               <img src="https://trex-sandwich.com/pokesignment/img/${randomPokemonJsonObj.image}">
                               </div>`;
        poke_day.innerHTML += `<h6>${randomPokemonJsonObj.name}</h6>
                                <p>${randomPokemonJsonObj.description}</p>`;
        document.querySelector("#poke_day_img").addEventListener("click", refreshPokeDay);
    }

    function refreshPokeDay() {
        displayRandomPokemon();
    }

    displayDetails();


    let allNamesArray = [];

    async function displayDetails() {
        let allNamesObj = await fetch("https://trex-sandwich.com/pokesignment/pokemon");
        allNamesArray = await allNamesObj.json();

        for (let i = 0; i < allNamesArray.length; i++) {
            let onePokemonObj = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?pokemon=${allNamesArray[i]}`);
            let onePokemonJsonObj = await onePokemonObj.json();
            const one_poke = document.querySelector("#one_poke");
            one_poke.innerHTML += `<div class='image' id="${onePokemonJsonObj.name}">
                                    <img src="https://trex-sandwich.com/pokesignment/img/${onePokemonJsonObj.image}">
                                    <h5>${onePokemonJsonObj.name}</h5>
                                    </div>`;
        }
        const pokes = document.querySelectorAll(".image");
        for (let j = 0; j < pokes.length; j += 1) {
            pokes[j].addEventListener("click", function () {
                clickPokemon(pokes[j].id)
            }, false);
        }
    }

    async function clickPokemon(name) {
        let clickedPokeObj = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?pokemon=${name}`);
        let clickedPokeJson = await clickedPokeObj.json();
        let one_poke = document.querySelector("#one_poke");
        if (!one_poke) {
            one_poke = document.querySelector("#clickedPoke");
        } else {
            one_poke.setAttribute("id", "clickedPoke")
        }
        one_poke.innerHTML = ``;

        await getWeakAgainst(one_poke, clickedPokeJson);
        one_poke.innerHTML += `<div class="pokeItem"><h5>${clickedPokeJson.name}</h5>
                <img src="https://trex-sandwich.com/pokesignment/img/${clickedPokeJson.image}">
                <small>${clickedPokeJson.description}</small></div>`;
        await getStrongAgainst(one_poke, clickedPokeJson);

        //
        const weakPokes = document.querySelectorAll(".weak");
        for (let j = 0; j < weakPokes.length; j += 1) {
            weakPokes[j].addEventListener("click", function () {
                clickPokemon(weakPokes[j].id)
            }, false);
        }
        const strongPokes = document.querySelectorAll(".strong");
        for (let j = 0; j < strongPokes.length; j += 1) {
            strongPokes[j].addEventListener("click", function () {
                clickPokemon(strongPokes[j].id)
            }, false);
        }
    }

    async function getWeakAgainst(one_poke, clickedPokeJson) {
        let weakWrapper = document.createElement("div");

        weakWrapper.className = "weakWrapper";
        weakWrapper.innerHTML += `<h5>Weak Against</h5>`;

        for (const poke of clickedPokeJson.opponents.weak_against) {
            let weakAgainst = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?pokemon=${poke}`);
            let weakAgainstJson = await weakAgainst.json();
            let weakItem = document.createElement("div");
            weakItem.className = "weak";
            weakItem.id = poke;
            weakItem.innerHTML += `
                                    <img src="https://trex-sandwich.com/pokesignment/img/${weakAgainstJson.image}">
                                    <h5>${weakAgainstJson.name}</h5>
                                   `;
            weakWrapper.appendChild(weakItem);
        }
        one_poke.appendChild(weakWrapper);
    }

    async function getStrongAgainst(one_poke, clickedPokeJson) {
        let strongWrapper = document.createElement("div");
        strongWrapper.className = "strongWrapper";
        strongWrapper.innerHTML += `<h5>Strong Against</h5>`;
        for (const poke of clickedPokeJson.opponents.strong_against) {
            let strongAgainst = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?pokemon=${poke}`);
            let strongAgainstJson = await strongAgainst.json();
            let strongItem = document.createElement("div");
            strongItem.className = "strong";
            strongItem.id = poke;
            strongItem.innerHTML += `
                                    <img src="https://trex-sandwich.com/pokesignment/img/${strongAgainstJson.image}">
                                    <h5>${strongAgainstJson.name}</h5>
                                    `;
            strongWrapper.appendChild(strongItem);
        }
        one_poke.appendChild(strongWrapper);
    }


});



