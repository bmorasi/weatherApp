const apiKey = '0a7a7bbc14f53c8ec908bc056e1d419e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const elementsMap = new Map([
    ['input', document.getElementById('locationInput')],
    ['imperial', document.getElementById('unitToggle')],
    ['location', document.getElementById('location')],
    ['weatherIcon', document.getElementById('weatherIcon')],
    ['temperature', document.getElementById('temperature')],
    ['description', document.getElementById('description')],
    ['humidity', document.getElementById('humidity')],
    ['wind', document.getElementById('wind')]
])

const defaultLocation = 'Amsterdam'; // Default location
let currentLocation = defaultLocation;

window.onload = (event) => {
    fetchWeather(currentLocation);
};

unitToggle.addEventListener('change', () => {
    fetchWeather(currentLocation);
})

function fetchWeather(location) {
    const imperial = elementsMap.get('imperial').checked;
    const unitToggleValue = imperial ? 'imperial' : 'metric';
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unitToggleValue}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            currentLocation = location; 
            if (data.cod !== 200) {
                elementsMap.get('location').textContent = 'Location not found';
                elementsMap.get('weatherIcon').hidden = true;
                elementsMap.get('temperature').textContent = '';
                elementsMap.get('description').textContent = '';
                elementsMap.get('humidity').textContent = `0%`;
                elementsMap.get('wind').textContent = `0 ${imperial ? 'mph' : 'm/s'}`;
                throw new Error(data.message);
            }
            elementsMap.get('location').textContent = data.name;
            elementsMap.get('weatherIcon').hidden = false;
            elementsMap.get('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            elementsMap.get('temperature').textContent = `${Math.round(data.main.temp)}°${imperial ? 'F' : 'C'}`;
            elementsMap.get('description').textContent = data.weather[0].description;
            elementsMap.get('humidity').textContent = `${data.main.humidity}%`;
            elementsMap.get('wind').textContent = `${Math.round(data.wind.speed)} ${imperial ? 'mph' : 'm/s'}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
