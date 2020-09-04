const form = document.getElementById('form');
const locBox = document.getElementById('location');
const tempBox = document.getElementById('temperature');
const humidBox = document.getElementById('humidity');
const conditionBox = document.getElementById('condition');
const errorBox = document.getElementById('error');

let city = document.getElementById('city');

const populate = (data) => {
    locBox.innerHTML = data.name;
    tempBox.innerHTML = `${data.main.temp}&#8451;`;
    humidBox.innerHTML = data.main.humidity;
    conditionBox.innerHTML = data.weather[0].description;
    errorBox.style.display = 'none';
}

const depopulate = () => {
    locBox.innerHTML = '';
    tempBox.innerHTML = '';
    humidBox.innerHTML = '';
    conditionBox.innerHTML = '';
    errorBox.style.display = "block";
}


const getWeather = async (e) => {
    e.preventDefault();
    const API_KEY = '10fdc6d6b455457b79f01f3317b2c222';
    
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}`);
        const data = await response.json();

        if(data.cod != "404") {
            populate(data);
            
        } else {
            depopulate();
        };
    } catch (error) {
        console.log(error);
        depopulate();
        
    } finally {
        city.value = "";
    }

   

}


// Event listener
form.addEventListener('submit', getWeather);