import { apiKey } from "./environment.js";

let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let currentWeather = document.getElementById("currentWeather");

let cityName = cityInput.value;

// geolocation
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position){
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);
}

function errorFunc(error){
    console.log(error.message);
}

let lat = position.coords.latitude;
let lon = position.coords.longitude;

async function currentGeoWeatherCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(data.main.temp);
}

currentGeoWeatherCall();

// Current weather API call
async function currentWeatherCall() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(data.main.temp);
}

searchBtn.addEventListener("click", function() {
    currentWeatherCall();
});

