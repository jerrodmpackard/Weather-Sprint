import { apiKey } from "./environment.js";

// Current Weather DOM
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
let currentWeatherMaxMin = document.getElementById("currentWeatherMaxMin");
let starBtn = document.getElementById("starBtn");

// Declaring necessary variables
let lat;
let lon;
let cityName;
// End of Declaring necessary variables

// 5 Day Forecast DOM
let day1Date = document.getElementById("day1Date");
let day1Max = document.getElementById("day1Max");
let day1Min = document.getElementById("day1Min");
let day1Icon = document.getElementById("day1Icon");
let day1Conditions = document.getElementById("day1Conditions");

let day2Date = document.getElementById("day2Date");
let day2Max = document.getElementById("day2Max");
let day2Min = document.getElementById("day2Min");
let day2Icon = document.getElementById("day2Icon");
let day2Conditions = document.getElementById("day2Conditions");

let day3Date = document.getElementById("day3Date");
let day3Max = document.getElementById("day3Max");
let day3Min = document.getElementById("day3Min");
let day3Icon = document.getElementById("day3Icon");
let day3Conditions = document.getElementById("day3Conditions");

let day4Date = document.getElementById("day4Date");
let day4Max = document.getElementById("day4Max");
let day4Min = document.getElementById("day4Min");
let day4Icon = document.getElementById("day4Icon");
let day4Conditions = document.getElementById("day4Conditions");

let day5Date = document.getElementById("day5Date");
let day5Max = document.getElementById("day5Max");
let day5Min = document.getElementById("day5Min");
let day5Icon = document.getElementById("day5Icon");
let day5Conditions = document.getElementById("day5Conditions");

// Geolocation code
navigator.geolocation.getCurrentPosition(success, errorFunc);

function success(position){
    console.log("Our latitude: " + position.coords.latitude);
    console.log("Our longitude: " + position.coords.longitude);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    currentWeather.innerText = "Locating..."

    currentGeoWeatherCall();
    fiveDayGeoWeatherCall();
}

function errorFunc(error){
    console.log(error.message);
}
// End of Geolocation code

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

    console.log(`Max/Min: ${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`);
    currentWeatherMaxMin.innerText = `Max/Min: ${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`;
}

// Search function -> Current weather API call
async function currentWeatherCall() {
    cityName = cityInput.value.toLowerCase();

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

    console.log(`Max/Min: ${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`);
    currentWeatherMaxMin.innerText = `Max/Min: ${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`;
}   

searchBtn.addEventListener("click", function() {
    currentWeatherCall();
    fiveDayWeatherCall();
});

// Geolocation -> 5 Day Forecast API Call
async function fiveDayGeoWeatherCall() {

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(data.list[0].main.temp);

    day1Date.innerText = data.list[0].dt_txt;
    day1Max.innerText = `${Math.round(data.list[0].main.temp_max)}°`;
    day1Min.innerText = `${Math.round(data.list[0].main.temp_min)}°`;
    day1Icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    day1Conditions.innerText = data.list[0].weather[0].description;

    day2Date.innerText = data.list[8].dt_txt;
    day2Max.innerText = `${Math.round(data.list[8].main.temp_max)}°`;
    day2Min.innerText = `${Math.round(data.list[8].main.temp_min)}°`;
    day2Icon.src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
    day2Conditions.innerText = data.list[8].weather[0].description;

    day3Date.innerText = data.list[16].dt_txt;
    day3Max.innerText = `${Math.round(data.list[16].main.temp_max)}°`;
    day3Min.innerText = `${Math.round(data.list[16].main.temp_min)}°`;
    day3Icon.src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
    day3Conditions.innerText = data.list[16].weather[0].description;

    day4Date.innerText = data.list[24].dt_txt;
    day4Max.innerText = `${Math.round(data.list[24].main.temp_max)}°`;
    day4Min.innerText = `${Math.round(data.list[24].main.temp_min)}°`;
    day4Icon.src = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
    day4Conditions.innerText = data.list[24].weather[0].description;

    day5Date.innerText = data.list[32].dt_txt;
    day5Max.innerText = `${Math.round(data.list[32].main.temp_max)}°`;
    day5Min.innerText = `${Math.round(data.list[32].main.temp_min)}°`;
    day5Icon.src = `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`
    day5Conditions.innerText = data.list[32].weather[0].description;
}

// Search function -> 5 Day Forecast API Call
async function fiveDayWeatherCall() {
    cityName = cityInput.value.toLowerCase();

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    console.log(data.list[0].main.temp);

    day1Date.innerText = data.list[0].dt_txt;
    day1Max.innerText = `${Math.round(data.list[0].main.temp_max)}°`;
    day1Min.innerText = `${Math.round(data.list[0].main.temp_min)}°`;
    day1Icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    day1Conditions.innerText = data.list[0].weather[0].description;

    day2Date.innerText = data.list[8].dt_txt;
    day2Max.innerText = `${Math.round(data.list[8].main.temp_max)}°`;
    day2Min.innerText = `${Math.round(data.list[8].main.temp_min)}°`;
    day2Icon.src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
    day2Conditions.innerText = data.list[8].weather[0].description;

    day3Date.innerText = data.list[16].dt_txt;
    day3Max.innerText = `${Math.round(data.list[16].main.temp_max)}°`;
    day3Min.innerText = `${Math.round(data.list[16].main.temp_min)}°`;
    day3Icon.src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
    day3Conditions.innerText = data.list[16].weather[0].description;

    day4Date.innerText = data.list[24].dt_txt;
    day4Max.innerText = `${Math.round(data.list[24].main.temp_max)}°`;
    day4Min.innerText = `${Math.round(data.list[24].main.temp_min)}°`;
    day4Icon.src = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
    day4Conditions.innerText = data.list[24].weather[0].description;

    day5Date.innerText = data.list[32].dt_txt;
    day5Max.innerText = `${Math.round(data.list[32].main.temp_max)}°`;
    day5Min.innerText = `${Math.round(data.list[32].main.temp_min)}°`;
    day5Icon.src = `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`
    day5Conditions.innerText = data.list[32].weather[0].description;
}

starBtn.addEventListener("click", function() {
    // if(starBtn.src == "../assets/star.png"){
    //     starBtn.src = "../assets/star-fill.png";
    // }
    // else{
    //     starBtn.src = "../assets/star.png";
    // }
    
    starBtn.src = "../assets/star-fill.png";

});