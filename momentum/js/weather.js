import {STRINGS} from './strings.js'

export {init}

const API_KEY = 'dcc676fe90675a4227fe0f44b8642e7f'

function init(){
    const cityField = document.querySelector('.city')
    cityField.value = localStorage.getItem('city') || 'Minsk'
    updateWeather(cityField.value)

    cityField.addEventListener('change', () => {
        localStorage.setItem('city', cityField.value)
        updateWeather(cityField.value)
    })

    document.addEventListener('changeLang', () => {
        const city = localStorage.getItem('city')
        updateWeather(city)
    });

    document.addEventListener('changeTimesOfDay', () => {
        const city = localStorage.getItem('city')
        updateWeather(city)
    });
}

function updateWeather(city){
    const lang = localStorage.getItem('lang')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`

    getWeather(url).then(showWeather).catch(()=> {
        showError();
    })
}

async function getWeather(url){
    const response = await fetch(url)
    return await response.json()
}
function showWeather(data){
    const lang = localStorage.getItem('lang')

    const weatherIcon = document.querySelector('.weather-icon')
    const weatherError = document.querySelector('.weather-error')
    const temperatureText = document.querySelector('.temperature')
    const weatherDescriptionText = document.querySelector('.weather-description')
    const windText = document.querySelector('.wind')
    const humidityText = document.querySelector('.humidity')

    const temp = `${Math.floor(data.main.temp)}°C`;
    const wind = `${STRINGS.weather[lang]['wind_speed']}: ${Math.floor(data.wind.speed)} ${STRINGS.weather[lang]['wind_unit']}`;
    const humidity = `${STRINGS.weather[lang]['humidity']}: ${Math.floor(data.main.humidity)}%`;
    const description = data.weather[0].description;
    const icon = `owf-${data.weather[0].id}`;

    weatherError.textContent = '';
    weatherIcon.classList.add(icon);
    temperatureText.textContent = temp;
    weatherDescriptionText.textContent = description;
    windText.textContent = wind;
    humidityText.textContent = humidity;
}

function showError(){
    const lang = localStorage.getItem('lang');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherError = document.querySelector('.weather-error');
    const temperatureText = document.querySelector('.temperature');
    const weatherDescriptionText = document.querySelector('.weather-description');
    const windText = document.querySelector('.wind');
    const humidityText = document.querySelector('.humidity');
    const cityField = document.querySelector('.city');

    weatherIcon.className = 'weather-icon owf';
    temperatureText.textContent = '';
    weatherDescriptionText.textContent = '';
    windText.textContent = '';
    humidityText.textContent = '';

    weatherError.textContent = ` ${STRINGS.weather[lang].error} '${cityField.value}'!`

}