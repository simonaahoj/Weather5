function formDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 let day = days[now.getDay()];
 let newDate = document.querySelector("#dateTime");

newDate.innerHTML = `${day} ${hours}:${min}`;

}

formDate();

function forecastHours(timestamp){
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  return `${hours}:${min}`
}

let currentTemperature = 0;


function currentWeather(response) {
  currentTemperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3, 6);
  let state = response.data.sys.country;


  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = `${currentTemperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
 
  
 

  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}, ${state}`;

  let wheaterImage = document.querySelector("#weather-image");
  wheaterImage.src = changeImg2(description);
}

function dispalyForcast(response) {
  let description = response.data.list[0].weather[0].main;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
 let forecast = null;

  for (let index = 0; index < 6; index++) {
     let forecast = response.data.list[index];
forecastElement.innerHTML +=` 
  <div class="col-sm-2" >
     <h5 class="card-title">${forecastHours(forecast.dt*1000)}</h5>
     <img width="60" src="${changeImg2(description)}"/>
      <strong >${Math.round(forecast.main.temp_max)}° / ${Math.round(forecast.main.temp_min)}°</strong>                  
  </div>`;
  }

}

function setCityWeather() {

  let cityName = document.querySelector("#type-city").value;
  let apiKey = "114cd41965401542304c61b473a9b798";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(currentWeather);
 
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl1}`).then(dispalyForcast);

}

let btSearch = document.querySelector("#search");
btSearch.addEventListener("click", setCityWeather);

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "114cd41965401542304c61b473a9b798";
  let apiUrlmyLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrlmyLocation}`).then(currentWeather);
  formDate();
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myLocation);
}
let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", getCurrentPosition);


function changeImg2(description) {

  if (description === "Clouds") {
    return "images/cloudy.jpg";
  }
  if (description === "Rain") {
    return "images/strog-rain.jpg";
  }
  if (description === "Clear") {
    return "images/sunny.jpg";
  }
  if (description === "Drizzle") {
    return "images/rain.jpg";
  }
  if (description === "Showers") {
    return "images/rain.jpg";
  }
  if (description === "Snow") {
    return "images/snow.jpg";
  }
  if (description === "Mist") {
    return "images/foggy.jpg";}
  if (description === "Thunderstorm"){
    return "images/strorm.jpg"
  }
}

function displayCelsium() {
   let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = `${currentTemperature}`;

}
function displayFahrenheit(){
  let temperatureElement = document.querySelector("#temperature");
  temperature.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
}


let celsium = document.querySelector("#celsium")
let fahrenheit = document.querySelector("#fahrenheit")

celsium.addEventListener("click", displayCelsium)
fahrenheit.addEventListener("click", displayFahrenheit)