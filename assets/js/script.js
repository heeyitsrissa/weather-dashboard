//create all varibles from 

const myApi = '0c4cad97dc5c998bce6e2bc35ca0c841';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const containerEl = document.querySelector('.container');
const textInputEl = document.getElementById('locationInput');
const searchBtnEl = document.getElementById('searchBtn');
const weatherInforEl = document.querySelector('WeatherInfo');
const locationId = document.getElementById('location');
const temperatureId = document.getElementById('temperature');
const descriptionId = document.getElementById('description');


//add an event listener on the search button

searchBtnEl.addEventListener('click', function(){
    const location = textInputEl.value;
    if(location){
        getWeather(location)
    }
})

function getWeather(location){
    const url = `${apiUrl}?lat={lat}&lon={lon}&appid={API key}`
}