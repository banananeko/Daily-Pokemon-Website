/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";

/* Must add the first addEventListener when you want to move internal JS script to external!!! */
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.navigation_hamburger').addEventListener('click', function() {
        document.querySelectorAll('.right_nav').forEach(nav => nav.classList.toggle('navigation_tray_reveal'));
    });
});

window.addEventListener("load", function () {
    displayRandomPokemon();
    async function displayRandomPokemon() {
        let randomPokemonObj = await fetch("https://trex-sandwich.com/pokesignment/pokemon?random=random");
        let randomPokemonJsonObj = await randomPokemonObj.json();
        const poke_day_img = document.querySelector("#poke_day_img");
        const poke_day = document.querySelector("#poke_day");
        poke_day_img.innerHTML += `<img src="https://trex-sandwich.com/pokesignment/img/${randomPokemonJsonObj.image}">`;
        poke_day.innerHTML += `<h6>${randomPokemonJsonObj.name}</h6>`;
        poke_day.innerHTML += `<p>${randomPokemonJsonObj.description}</p>`;
        document.querySelector("#poke_day_img").addEventListener("click", refreshPage);
    }

    function refreshPage(){
        window.location.reload();
    } 

});



