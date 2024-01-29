//create all varibles from 

const apiKey = '0c4cad97dc5c998bce6e2bc35ca0c841';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'

const formEl = document.getElementById('search-form');

const submitButton = document.getElementById('submitBtn');

let savedCities = [];

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    searchWeather();
});

async function getWeatherData(city, cnt = 5, units = 'imperial') {
    const weatherResponse = await fetch(`${currentWeatherUrl}?q=${city}&appid=${apiKey}&units=${units}`);
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(`${forecastUrl}?q=${city}&cnt=${cnt}&appid=${apiKey}&units=${units}`);
    const forecastData = await forecastResponse.json();
    console.log(forecastResponse)

    return { current: weatherData, forecast: forecastData };
}

function getCities(){
    try {
        const savedCitiesJSON = localStorage.getItem('cities');
        savedCities = (savedCitiesJSON && savedCitiesJSON !== 'undefined') ? JSON.parse(savedCitiesJSON) : [];
    } catch (error) {
        console.error('Error parsing savedCitiesJSON:', error);
    }

    return savedCities;
}

function updateWeatherUI(weatherData) {
    const weatherElement = document.getElementById('weatherInfo');
    const forecastEl = document.getElementById('forecast');

    if (weatherData.current.name && weatherData.current.sys && weatherData.current.sys.country) {
        weatherElement.innerHTML = `<h2>${weatherData.current.name}, ${weatherData.current.sys.country}</h2>
        <img class="weather-icon" src="./assets/images/cloud-bolt-solid.svg"/>
            <p>Description: ${weatherData.current.weather[0].description}</p>
            <p>Temperature: ${weatherData.current.main.temp}°F</p>
            <p>Wind Speed: ${weatherData.current.wind.speed} mph</p>
            <p>Humidity: ${weatherData.current.main.humidity}%</p>`;
    } else {
        weatherElement.innerHTML = `<p>Weather data not available.</p>`;
    }

        forecastEl.innerHTML = '';
        // console.log('Forecast Data:', weatherData.forecast.list);
        weatherData.forecast.list.forEach(forecast => {
            // console.log('Timestamp:', forecast.dt);
            const dateTime = new Date(forecast.dt * 1000);
            const description = forecast.weather[0].description;
            const temperature = forecast.main.temp;
            const windspeed = forecast.wind.speed;
            const humidity = forecast.main.humidity;

        

            const dayCard = document.createElement('div');
            dayCard.classList.add('dayCard');
            dayCard.innerHTML = `
            <h3>${dateTime.toLocaleDateString('en-US', { weekday: 'long'})}</h3>
            <img src="./assets/images/cloud-rain-solid.svg" class="icon"/>
                <p>Description: ${description}</p>
                <p>Temperature: ${temperature}°F</p>
                <p>Wind Speed: ${windspeed}mph</p>
                <p>Humidity: ${humidity}%</p>`;
    
            forecastEl.appendChild(dayCard);
            
        });

        saveCities(weatherData.current.name);
}

function saveCities(city){

    savedCities.push(city);
    localStorage.setItem('cities', JSON.stringify(savedCities));
}

async function searchWeather() {
    const cityInput = document.getElementById('city-input').value;
    const weatherData = await getWeatherData(cityInput);

        if (weatherData.cod === '404') {
    alert('City not found. Please enter a valid city name.');
    } else {
    updateWeatherUI(weatherData)
    }
}