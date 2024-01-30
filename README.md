# weather-dashboard

## Description 
For this challenge we were asked to make a weather dashboard, the user is asked to enter a city, once the city is entered the are presented with current weather and a 5 day forecast which includes windspeed, temperature, description of the weather, humidity and the appropriate icon for the weather presented. This challenge was a fun one, even though it was a lot of work and I did find it challenging I enjoyed it. 

## Installation
First thing I did to complete this project was complete the HTML, after that was completed I did some basic css. Next I started on the javascript, first thing I did was make variables for my api key, the url for the current weather and the url for the forecasted weather. The first function I wrote was the submit handler on the search button. Next I wrote the async function get weather data to fect the data from both the urls. The next function I wrote was to get the cities that we searched and was saved in localStorage. The next function was for putting the current and forecaseted weather on the page for this part i had to google a lot and read the openweathermap api documentation, especially for the forcasted weather to see how I could loop over the hours to make sure it was only forecasting the next 5 days and not every few hours. After that i worked on the save cities function to save the cities search in local storage. The I wrote the last function so that when the city is search the weather from that city is pulled up. The last thing I did was display the icons for the current weather descpription, at first I downloaded my own icons and thought that was how we would use them in the javascript but then I realized openweathermap api supplies their own so it ended up being much easier than I intitially thought. I would say this project I really wanted the CSS to look different than me previous projects and I am proud of how it turned out.

## Usage 
This Application works when the user enters a city name and is then presented with the current weather and 5 day forecast for that city, they see the description for the current and forecasted weather alonf with an icon that matches the desciption, they are also presented with the temperature, windspeed, and humidity. When the city is searched the city is placed into local storage.

link to deployed application: https://heeyitsrissa.github.io/weather-dashboard/

screenshot of deployed application: ![Alt text](<assets/images/heeyitsrissa.github.io_weather-dashboard_ (1).png>) ![Alt text](<assets/images/heeyitsrissa.github.io_weather-dashboard_ (1) copy.png>)

## License 
![Static Badge](https://img.shields.io/badge/license-MIT-blue)
