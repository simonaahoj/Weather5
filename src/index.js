function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let localDate = new Date(targetTimestamp);
  let hours = localDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = localDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = localDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day}, ${hours}:${minutes}`;
}

function formatHours2(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let localDate = new Date(targetTimestamp);
  let hours = localDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = localDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatHours(timestamp){
  let date= new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes= `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function currentWeather(response) {
  currentTemperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3, 6);
  let state = response.data.sys.country;

  let newDate = document.querySelector("#dateTime");
  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = `${currentTemperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
  newDate.innerHTML = formatDate(new Date(), response.data.timezone);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatHours2(new Date(response.data.sys.sunrise*1000), response.data.timezone);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatHours2(new Date(response.data.sys.sunset*1000), response.data.timezone);

 

  let city = document.querySelector("h1");
  city.innerHTML = `${response.data.name}, ${state}`;

  let wheaterImage = document.querySelector("#weather-image");
  wheaterImage.src = changeImg2(description);
}

function dispalyForcast(response, unit) {
  savedResponse = response;
  let description = response.data.list[0].weather[0].main;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
     let forecast = savedResponse.data.list[index];
     forecastElement.innerHTML +=` 
      <div class="col-sm-2" >
        <h5 class="card-title">${formatHours(forecast.dt * 1000 + (savedResponse.data.city.timezone*1000))}</h5>
        <img width="60" src="${changeImg2(description)}"/>
        <strong >${convertTemperature(forecast.main.temp_max, unit)}° / ${convertTemperature(forecast.main.temp_min, unit)}°</strong>                  
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
  formatDate(timestamp);
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
  if (description === "Fog") {
    return "images/foggy.jpg"
  }
}

let currentTemperature = 0;
let savedResponse = {};

function displayCelsium(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector("#temperature");
  currentTemperatureElement.innerHTML = `${currentTemperature}`;
  celsium.classList.add("active");
  fahrenheit.classList.remove("active");
  dispalyForcast(savedResponse, "celsium");
}

function displayFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
  celsium.classList.remove("active");
  fahrenheit.classList.add("active");
  dispalyForcast(savedResponse, "fahrenheit");
}

function convertTemperature(tempetrature, unit){
  if(unit === "fahrenheit")
    return Math.round((tempetrature * 9) / 5 + 32)

  return Math.round(tempetrature)
}

let celsium = document.querySelector("#celsium")
let fahrenheit = document.querySelector("#fahrenheit")

celsium.addEventListener("click", displayCelsium)
fahrenheit.addEventListener("click", displayFahrenheit)