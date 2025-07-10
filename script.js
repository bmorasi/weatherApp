const apiKey = '0a7a7bbc14f53c8ec908bc056e1d419e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const unitToggle = document.getElementById('unitToggle');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

window.onload = (event) => { // Default location
    fetchWeather('Amsterdam');
};

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const unitToggleValue = unitToggle.checked ? 'imperial' : 'metric';
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unitToggleValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°${unitToggle.checked ? 'F' : 'C'}`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
