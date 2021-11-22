window.addEventListener("load", function () {

    const button = document.querySelector("#change-pkm");
    const img = document.querySelector("#pkm-sprite");
    const spanTitle = document.querySelector("#pkm-title");
    const spanName = document.querySelector("#pkm-name");
    const spanId = document.querySelector("#pkm-id");
    const spanTypes = document.querySelector("#pkm-types");
    const spanDex = document.querySelector("#pkm-dex");
    const spanCC = document.querySelector("#call-count");

    button.addEventListener("click", function (event) {
        event.preventDefault();
        changePokemon();
    });

    async function changePokemon() {
        const response = await fetch("./api/random");
        const pokemon = await response.json();

        img.src = `./images/${pokemon.sprite}`;
        spanTitle.innerHTML = pokemon.name;
        spanName.innerHTML = pokemon.name;
        spanId.innerHTML = pokemon.id;
        spanTypes.innerHTML = pokemon.types;
        spanDex.innerHTML = pokemon.dexEntry;

        const callCount = Cookies.get("callCount");
        spanCC.innerHTML = callCount;

    }
});