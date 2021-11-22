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
                                <span style="white-space: pre-line">${randomPokemonJsonObj.description}</span>`;
        document.querySelector("#poke_day_img").addEventListener("click",
            function () {
                refreshPokeDay(randomPokemonJsonObj.name)
            });
        let details = document.createElement("div");
        details.className = 'button';
        details.innerHTML = 'Show Details';
        poke_day.appendChild(details);
        details.addEventListener("click", function () {
            clickPokemon(randomPokemonJsonObj.name)
        });

        const navBar = document.querySelector(".right_nav");
        const pokeDayLi = document.querySelector("#showPokeDayLi");
        if (pokeDayLi) {
            navBar.removeChild(pokeDayLi);
        }

        let navButton = document.createElement("li");
        navButton.id = 'showPokeDayLi';
        let buttonContent = document.createElement("a");
        buttonContent.innerHTML = 'Show Pokemon of the Day';
        buttonContent.id = 'showPokeDay';
        navButton.appendChild(buttonContent);
        navBar.appendChild(navButton);
        buttonContent.addEventListener("click", function () {
            clickPokemon(randomPokemonJsonObj.name)
        });

    }

    function refreshPokeDay(randomPokemonJsonObj) {
        // document.querySelector('#showPokeDay').removeEventListener("click", click);
        displayRandomPokemon();
    }

    displayDetails();
    let allNamesArray = [];

    async function displayDetails() {
        let allNamesObj = await fetch("https://trex-sandwich.com/pokesignment/pokemon");
        allNamesArray = await allNamesObj.json();
        let one_poke = document.querySelector("#one_poke");
        if (!one_poke) {
            one_poke = document.querySelector("#clickedPoke");
            one_poke.setAttribute("id", "one_poke")
        }
        one_poke.innerHTML = ``;
        for (let i = 0; i < allNamesArray.length; i++) {
            let onePokemonObj = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?pokemon=${allNamesArray[i]}`);
            let onePokemonJsonObj = await onePokemonObj.json();
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
        console.log(name);
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

        let pokeItem = document.createElement("div");
        pokeItem.className = "pokeItem";

        pokeItem.innerHTML += `<h5>${clickedPokeJson.name}</h5>
                <img src="https://trex-sandwich.com/pokesignment/img/${clickedPokeJson.image}">
                <small>${clickedPokeJson.description}</small>
                `;
        let properties = document.createElement("div");
        properties.className = "pokeProperties";


        let classList = document.createElement("div");
        classList.className = "classList";
        properties.appendChild(classList);
        classList.innerHTML = `<h5>Class List</h5>`;
        for (const c of clickedPokeJson.classes) {
            let singleClass = document.createElement("div");
            let className = document.createElement("small");
            className.id = c;
            className.innerHTML = c.toUpperCase();
            singleClass.style.padding = '0.54em'
            singleClass.appendChild(className);
            classList.appendChild(singleClass);
            let classObj = await fetch(`https://trex-sandwich.com/pokesignment/keyword?keyword=${c}`);
            let classJson = await classObj.json();
            className.style.backgroundColor = classJson.background;
            className.style.color = classJson.foreground;
            className.style.padding = '2px';
            className.style.border = '1px solid black';
        }
        let signatureMoves = document.createElement("div");
        signatureMoves.className = "signatureMoves";
        signatureMoves.innerHTML = `<h5>Signature Moves</h5>`;
        clickedPokeJson.signature_skills.forEach(skill => {
            let singleMove = document.createElement("div");
            let moveName = document.createElement("small");
            moveName.id = skill;
            moveName.innerHTML = skill;
            singleMove.style.padding = '0.54em'
            singleMove.appendChild(moveName);
            signatureMoves.appendChild(singleMove);
            moveName.style.padding = '2px';

        })

        properties.appendChild(signatureMoves);
        pokeItem.appendChild(properties);
        one_poke.appendChild(pokeItem);

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

    displayFunctionButtons();

    function displayFunctionButtons() {
        let menuBar = document.querySelector("#menu");
        let randPoke = document.createElement("div");
        randPoke.className = 'button';
        randPoke.innerHTML = 'Load Random Pokemon';
        menuBar.appendChild(randPoke);
        randPoke.addEventListener("click", loadRandomPoke);
        document.querySelector('#loadRandom').addEventListener("click", loadRandomPoke);

        let listPoke = document.createElement("div");
        listPoke.className = 'button';
        listPoke.innerHTML = 'Show list of Pokemon';
        menuBar.appendChild(listPoke);
        listPoke.addEventListener("click", displayDetails);
        document.querySelector('#showList').addEventListener("click", displayDetails);
    }

    async function loadRandomPoke() {
        let randomPokemonObj = await fetch("https://trex-sandwich.com/pokesignment/pokemon?random=random");
        let randomPokemonJsonObj = await randomPokemonObj.json();
        await clickPokemon(randomPokemonJsonObj.name);
    }

});



