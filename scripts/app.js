import { apiKey } from "./environment.js";
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localStorage.js";

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
// let favoritesBtn = document.getElementById("favoritesBtn");

// Declaring necessary variables
let lat;
let lon;
let cityName;
let dayNames = [];
// let favoritesList = [];
let inFavorites;
let city = locationCode.innerText;
// End of variable declarations

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

    humidity.innerText = "Locating..."

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

    currentWeather.innerText = `${Math.round(data.main.temp)}° F`;

    currentWeatherMain.innerText = `${data.weather[0].main}`;

    currentWeatherConditions.innerText = `${data.weather[0].description}`;

    feelsLike.innerText = `Like: ${Math.round(data.main.feels_like)}°`;

    humidity.innerText = `Humidity: ${Math.round(data.main.humidity)}%`;

    visibility.innerText = `Visibility: ${Math.round(data.visibility)}m`;

    windSpeed.innerText = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

    locationCode.innerText = `${data.name}, ${data.sys.country}`;

    currentWeatherMaxMin.innerText = `${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`;
}

// Search function -> Current weather API call
async function currentWeatherCall() {
    cityName = cityInput.value.toLowerCase();

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=imperial`);

    const data = await promise.json();

    currentWeather.innerText = `${Math.round(data.main.temp)}° F`;

    currentWeatherMain.innerText = `${data.weather[0].main}`;

    currentWeatherConditions.innerText = `${data.weather[0].description}`;

    feelsLike.innerText = `Like: ${Math.round(data.main.feels_like)}°`;

    humidity.innerText = `Humidity: ${Math.round(data.main.humidity)}%`;

    visibility.innerText = `Visibility: ${Math.round(data.visibility)}m`;

    windSpeed.innerText = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

    locationCode.innerText = `${data.name}, ${data.sys.country}`;

    currentWeatherMaxMin.innerText = `${Math.round(data.main.temp_max)}°/${Math.round(data.main.temp_min)}°`;
}   

searchBtn.addEventListener("click", function() {
    currentWeatherCall();
    fiveDayWeatherCall();
    // cityInput.value = "";
    console.log(inFavorites);
});

// Geolocation -> 5 Day Forecast API Call
async function fiveDayGeoWeatherCall() {
    dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    let day1 = new Date(data.list[0].dt_txt);
    let day1Day = day1.getDay();

    day1Date.innerText = dayNames[day1Day];
    day1Max.innerText = `${Math.round(data.list[0].main.temp_max)}°`;
    day1Min.innerText = `${Math.round(data.list[0].main.temp_min)}°`;
    day1Icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    day1Conditions.innerText = data.list[0].weather[0].description;

    let day2 = new Date(data.list[8].dt_txt);
    let day2Day = day2.getDay();

    day2Date.innerText = dayNames[day2Day];
    day2Max.innerText = `${Math.round(data.list[8].main.temp_max)}°`;
    day2Min.innerText = `${Math.round(data.list[8].main.temp_min)}°`;
    day2Icon.src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
    day2Conditions.innerText = data.list[8].weather[0].description;

    let day3 = new Date(data.list[16].dt_txt);
    let day3Day = day3.getDay();

    day3Date.innerText = dayNames[day3Day];
    day3Max.innerText = `${Math.round(data.list[16].main.temp_max)}°`;
    day3Min.innerText = `${Math.round(data.list[16].main.temp_min)}°`;
    day3Icon.src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
    day3Conditions.innerText = data.list[16].weather[0].description;

    let day4 = new Date(data.list[24].dt_txt);
    let day4Day = day4.getDay();

    day4Date.innerText = dayNames[day4Day];
    day4Max.innerText = `${Math.round(data.list[24].main.temp_max)}°`;
    day4Min.innerText = `${Math.round(data.list[24].main.temp_min)}°`;
    day4Icon.src = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
    day4Conditions.innerText = data.list[24].weather[0].description;

    let day5 = new Date(data.list[32].dt_txt);
    let day5Day = day5.getDay();

    day5Date.innerText = dayNames[day5Day];
    day5Max.innerText = `${Math.round(data.list[32].main.temp_max)}°`;
    day5Min.innerText = `${Math.round(data.list[32].main.temp_min)}°`;
    day5Icon.src = `https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`
    day5Conditions.innerText = data.list[32].weather[0].description;
}

// Search function -> 5 Day Forecast API Call
async function fiveDayWeatherCall() {
    cityName = cityInput.value.toLowerCase();
    dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);

    const data = await promise.json();

    let day1 = new Date(data.list[0].dt_txt);
    let day1Day = day1.getDay();

    day1Date.innerText = dayNames[day1Day];
    day1Max.innerText = `${Math.round(data.list[0].main.temp_max)}°`;
    day1Min.innerText = `${Math.round(data.list[0].main.temp_min)}°`;
    day1Icon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    day1Conditions.innerText = data.list[0].weather[0].description;

    let day2 = new Date(data.list[8].dt_txt);
    let day2Day = day2.getDay();

    day2Date.innerText = dayNames[day2Day];
    day2Max.innerText = `${Math.round(data.list[8].main.temp_max)}°`;
    day2Min.innerText = `${Math.round(data.list[8].main.temp_min)}°`;
    day2Icon.src = `https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`
    day2Conditions.innerText = data.list[8].weather[0].description;

    let day3 = new Date(data.list[16].dt_txt);
    let day3Day = day3.getDay();

    day3Date.innerText = dayNames[day3Day];
    day3Max.innerText = `${Math.round(data.list[16].main.temp_max)}°`;
    day3Min.innerText = `${Math.round(data.list[16].main.temp_min)}°`;
    day3Icon.src = `https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`
    day3Conditions.innerText = data.list[16].weather[0].description;

    let day4 = new Date(data.list[24].dt_txt);
    let day4Day = day4.getDay();

    day4Date.innerText = dayNames[day4Day];
    day4Max.innerText = `${Math.round(data.list[24].main.temp_max)}°`;
    day4Min.innerText = `${Math.round(data.list[24].main.temp_min)}°`;
    day4Icon.src = `https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`
    day4Conditions.innerText = data.list[24].weather[0].description;

    let day5 = new Date(data.list[32].dt_txt);
    let day5Day = day5.getDay();

    day5Date.innerText = dayNames[day5Day];
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
    
    // starBtn.src = "../assets/star-fill.png";
    
    // favoritesList.push(locationCode.innerText);
    // console.log(favoritesList);

    getLocalStorage();
    saveToLocalStorage(locationCode.innerText);

    

    // localStorage.setItem("favorites", JSON.stringify(favoritesList));
});

// favoritesBtn.addEventListener("click", function() {
//     favoritesList.push(cityInput.value);
//     console.log(favoritesList);

//     localStorage.setItem("favorites", JSON.stringify(favoritesList));
// })

getLocalStorage();
// if location is in array, inFavorites = true
if(favoritesList.includes(city)){
    inFavorites = true;
}else{
    inFavorites = false;
}

if(inFavorites){
    starBtn.src = "../assets/star-fill.png";
}

if(!inFavorites){
    starBtn.src = "../assets/star.png";
}

console.log(inFavorites);
