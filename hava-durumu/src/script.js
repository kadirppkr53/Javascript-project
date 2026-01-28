const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

async function checkWeather(city) {
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        alert("Şehir ismi hatalı!");
    } else {
        let data = await response.json(); 

        
        document.querySelector("#cityName").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#desc").innerHTML = data.weather[0].description;
        document.querySelector("#humidity").innerHTML = "Nem: %" + data.main.humidity;
        document.querySelector("#wind").innerHTML = "Rüzgar: " + data.wind.speed + " km/s";
        
        console.log(data); 
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {    
        checkWeather(cityInput.value);
    }
});