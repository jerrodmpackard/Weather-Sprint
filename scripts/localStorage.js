localStorage.js

function saveToLocalStorage(city) {
    // get the current values that are saved into local storage
    // create an array of values to store into local storage
    let favoritesList = getLocalStorage();
    // add new city into our favoritesList array
    if (!favoritesList.includes(city)) {
        favoritesList.push(city);
    }
    // save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favoritesList));
}

function getLocalStorage(){
    // get all of the values that are stored in favorites in local storage
    let localStorageData = localStorage.getItem('Favorites');
    if (localStorageData == null) {
        return [];
    }
    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(city){
    let favoritesList = getLocalStorage();
    // find the index of the name in local storage
    let nameIndex = favoritesList.indexOf(city);
    // remove the name from the array using the splice method.
    favoritesList.splice(nameIndex, 1);
    // save updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favoritesList));
}

export{ saveToLocalStorage, getLocalStorage, removeFromLocalStorage }
