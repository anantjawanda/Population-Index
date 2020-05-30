

const dataSource = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(dataSource)
.then((response) => response.json())
.then((data) => cities.push(...data))

function findMatches(wordToMatch, cities) {
    return cities.filter(function(place) {
        let regex = new RegExp(wordToMatch, "i");
        return place.city.match(regex) || place.state.match(regex);

    })
}

function displayMatches() {
    let matchedArr = findMatches(this.value, cities);
    var myLong = 32.0; // whatever your location is
    var myLat = -96.0;
    let output = matchedArr.map(place => {

        let matchWordRegex = new RegExp(this.value, "gi");
        let spanStr = `<span class="highlight">${this.value}</span>`;
        let cityName = place.city.replace(matchWordRegex, spanStr);
        let stateName = place.state.replace(matchWordRegex, spanStr);
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${addCommas(place.population)}</span>
        </li>`;
    }).join("");
    searchSuggest.innerHTML = output;
}

function addCommas(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
let searchInput = document.querySelector(".search");
let searchSuggest = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", displayMatches);