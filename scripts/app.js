import { apiKey } from "./environment.js";

let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let currentWeather = document.getElementById("currentWeather");
let currentWeatherMain = document.getElementById("currentWeatherMain");
let currentWeatherConditions = document.getElementById("currentWeatherConditions");
let feelsLike = document.getElementById("feelsLike");
let humidity = document.getElementById("humidity");
let visibility = document.getElementById("visibility");
let windSpeed = document.getElementById("windSpeed");
let locationCode = document.getElementById("locationCode");

let lat;
let lon;

// geolocation
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position){
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    currentWeather.innerText = "Locating..."

    currentGeoWeatherCall();
}

function errorFunc(error){
    console.log(error.message);
}

// Geolocation function -> Current weather API call
async function currentGeoWeatherCall() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(`Current weather: ${Math.round(data.main.temp)}° F`);
    currentWeather.innerText = `Current weather: ${Math.round(data.main.temp)}° F`;

    console.log(`Currently: ${data.weather[0].main}`);
    currentWeatherMain.innerText = `Currently: ${data.weather[0].main}`;

    console.log(`Currently: ${data.weather[0].description}`);
    currentWeatherConditions.innerText = `Currently: ${data.weather[0].description}`;

    console.log(`Feels like: ${Math.round(data.main.feels_like)}° F`);
    feelsLike.innerText = `Feels like: ${Math.round(data.main.feels_like)}° F`;

    console.log(`Humidity: ${Math.round(data.main.humidity)}%`);
    humidity.innerText = `Humidity: ${Math.round(data.main.humidity)}%`;

    console.log(`Visibility: ${Math.round(data.visibility)}m`);
    visibility.innerText = `Visibility: ${Math.round(data.visibility)}m`;

    console.log(`Wind Speed: ${Math.round(data.wind.speed)} mph`);
    windSpeed.innerText = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

    console.log(`Location: ${data.name}, ${data.sys.country}`);
    locationCode.innerText = `Location: ${data.name}, ${data.sys.country}`;
}

// Search function -> Current weather API call
async function currentWeatherCall() {
    let cityName = cityInput.value.toLowerCase();

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(`Current weather: ${Math.round(data.main.temp)}° F`);
    currentWeather.innerText = `Current weather: ${Math.round(data.main.temp)}° F`;

    console.log(`Currently: ${data.weather[0].main}`);
    currentWeatherMain.innerText = `Currently: ${data.weather[0].main}`;

    console.log(`Currently: ${data.weather[0].description}`);
    currentWeatherConditions.innerText = `Currently: ${data.weather[0].description}`;

    console.log(`Feels like: ${Math.round(data.main.feels_like)}° F`);
    feelsLike.innerText = `Feels like: ${Math.round(data.main.feels_like)}° F`;

    console.log(`Humidity: ${Math.round(data.main.humidity)}%`);
    humidity.innerText = `Humidity: ${Math.round(data.main.humidity)}%`;

    console.log(`Visibility: ${Math.round(data.visibility)}m`);
    visibility.innerText = `Visibility: ${Math.round(data.visibility)}m`;

    console.log(`Wind Speed: ${Math.round(data.wind.speed)} mph`);
    windSpeed.innerText = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

    console.log(`Location: ${data.name}, ${data.sys.country}`);
    locationCode.innerText = `Location: ${data.name}, ${data.sys.country}`;
}

searchBtn.addEventListener("click", function() {
    currentWeatherCall();
});

// currentWeatherCall();