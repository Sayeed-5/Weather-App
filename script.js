const inputBox = document.getElementById('input')
const searchBtn = document.getElementById('search')
const wheather_img = document.querySelector('.wheather-img')
const tempreture = document.querySelector('.tempreture')
const description = document.querySelector('.description')
const humidity = document.getElementById('humidity')
const wind_speed = document.getElementById('wind-speed')
const location_not_found = document.querySelector('.location-not-found')
const wheather_body = document.querySelector('.wheather-body')

// let api = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// let api_key = "79b611578789071958d26443ee3f0800"

searchBtn.addEventListener("click", () => {
    checkWheather(inputBox.value)
})

async function checkWheather(city){
    const api_key = "79b611578789071958d26443ee3f0800"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const wheather_data = await fetch(`${url}`).then(response => response.json())

    if(wheather_data.cod === '404'){
        location_not_found.style.display = "flex"
        wheather_body.style.display = "none"
        return;
    }

    location_not_found.style.display = "none"
    wheather_body.style.display = "flex"

    tempreture.innerHTML = `${Math.round(wheather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${wheather_data.weather[0].description}`;
    humidity.innerHTML = `${wheather_data.main.humidity}%`;
    wind_speed.innerHTML = `${wheather_data.wind.speed}km/H`;

    switch(wheather_data.weather[0].main){
        case 'Clouds':
            wheather_img.src = "images/cloud.png"
            break;
        case 'Clear':
            wheather_img.src = "images/clear.png"
            break;
        case 'Rain':
            wheather_img.src = "images/rain.png"
            break;
        case 'Mist':
            wheather_img.src = "images/mist.png"
            break;
        case 'Snow':
            wheather_img.src = "images/snow.png"
            break;
    }

    console.log(wheather_data)
}

