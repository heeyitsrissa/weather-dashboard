//create all varibles from 

const apiKey = '0c4cad97dc5c998bce6e2bc35ca0c841';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'

const formEl = document.getElementById('search-form');

const submitButton = document.getElementById('submitBtn');

let savedCities = [];

const icons = {
    '01d': 'https://openweathermap.org/img/wn/01d@2x.png',
    '01n': 'https://openweathermap.org/img/wn/01n@2x.png',
    '02d': 'https://openweathermap.org/img/wn/02d@2x.png',
    '02n': 'https://openweathermap.org/img/wn/02n@2x.png',
    '03d': 'https://openweathermap.org/img/wn/03d@2x.png',
    '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
    '04d': 'https://openweathermap.org/img/wn/04d@2x.png',
    '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
    '09d': 'https://openweathermap.org/img/wn/09d@2x.png',
    '09n': 'https://openweathermap.org/img/wn/09n@2x.png',
    '10d': 'https://openweathermap.org/img/wn/10d@2x.png',
    '10n': 'https://openweathermap.org/img/wn/10n@2x.png',
    '11d': 'https://openweathermap.org/img/wn/11d@2x.png',
    '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
    '13d': 'https://openweathermap.org/img/wn/13d@2x.png',
    '13n': 'https://openweathermap.org/img/wn/13n@2x.png',
    '50d': 'https://openweathermap.org/img/wn/50d@2x.png',
    '50n': 'https://openweathermap.org/img/wn/50n@2x.png'
};


document.getElementById('weatherInfo').style.display = 'none';
document.getElementById('forecast').style.display = 'none';

formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    searchWeather();
    document.getElementById('weatherInfo').style.display = 'block';
    document.getElementById('forecast').style.display = 'flex';
    
});

async function getWeatherData(city, units = 'imperial') {
    const weatherResponse = await fetch(`${currentWeatherUrl}?q=${city}&appid=${apiKey}&units=${units}`);
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=${units}`);
    const forecastData = await forecastResponse.json();
    console.log(forecastResponse)

    return { current: weatherData, forecast: forecastData };
}

function getCities(){
    try {
        const savedCitiesJSON = localStorage.getItem('cities');
        savedCities = savedCitiesJSON ? JSON.parse(savedCitiesJSON) : [];
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
        <img src="${icons[weatherData.current.weather[0].icon]}"/>
            <p>Description: ${weatherData.current.weather[0].description}</p>
            <p>Temperature: ${weatherData.current.main.temp}°F</p>
            <p>Wind Speed: ${weatherData.current.wind.speed} mph</p>
            <p>Humidity: ${weatherData.current.main.humidity}%</p>`;
            
    } else {
        weatherElement.innerHTML = `<p>Weather data not available.</p>`;
    }   console.log(weatherData)

        forecastEl.innerHTML = '';
        // console.log('Forecast Data:', weatherData.forecast.list);
            // console.log('Timestamp:', forecast.dt);
            for(let i = 0; i < weatherData.forecast.list.length; i +=8){
            const forecast = weatherData.forecast.list[i];
            const dateTime = new Date(forecast.dt * 1000);
            const description = forecast.weather[0].description;
            const temperature = forecast.main.temp;
            const windspeed = forecast.wind.speed;
            const humidity = forecast.main.humidity;
           

            const dayCard = document.createElement('div');
            dayCard.classList.add('dayCard');
            dayCard.innerHTML = `
            <h3>${dateTime.toLocaleDateString('en-US', { weekday: 'long'})}</h3>
            <img src="${icons[forecast.weather[0].icon]}"/>
                <p>Description: ${description}</p>
                <p>Temperature: ${temperature}°F</p>
                <p>Wind Speed: ${windspeed}mph</p>
                <p>Humidity: ${humidity}%</p>`;
    
            forecastEl.appendChild(dayCard);
            }   
    
        saveCities(weatherData.current.name);
    }
    

function saveCities(city){
    const savedCities = getCities();
      savedCities.push(city);
      localStorage.setItem('cities', JSON.stringify(savedCities));
      addCities(city);
    
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

function addCities(city){
    const cityBtnList = document.getElementById('cityBtnList');

    const listItems = document.createElement('li')
    const button = document.createElement('button');
    button.textContent = city;

    button.addEventListener('click', function (){
        searchWeatherForCity(city);
    } )
    listItems.appendChild(button)
    cityBtnList.appendChild(listItems);
};

function searchWeatherForCity(city){
    document.getElementById('city-input').value = city;
    searchWeather();
}

