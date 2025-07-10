const apiKey = '0a7a7bbc14f53c8ec908bc056e1d419e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const unitToggle = document.getElementById('unitToggle');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const weatherIcon = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

const defaultLocation = 'Amsterdam'; // Default location
let currentLocation = defaultLocation;

window.onload = (event) => {
    fetchWeather(currentLocation);
};

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

unitToggle.addEventListener('change', () => {
    fetchWeather(currentLocation);
})

function fetchWeather(location) {
    const unitToggleValue = unitToggle.checked ? 'imperial' : 'metric';
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unitToggleValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentLocation = location; 
            if (data.cod !== 200) {
                locationElement.textContent = 'Location not found';
                weatherIcon.hidden = true;
                temperatureElement.textContent = '';
                descriptionElement.textContent = '';
                throw new Error(data.message);
            }
            locationElement.textContent = data.name;
            weatherIcon.hidden = false;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°${unitToggle.checked ? 'F' : 'C'}`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
