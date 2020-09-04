const form = document.getElementById('form');
const loc = document.getElementById('location');
const temp = document.getElementById('temperature');
const humid = document.getElementById('humidity');
const condition = document.getElementById('condition');
const error = document.getElementById('error');
const API_KEY = '10fdc6d6b455457b79f01f3317b2c222';
// const API_CALL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

const getWeather = (e) => {
    e.preventDefault();
    
}


// Event listener
form.addEventListener('submit', getWeather);