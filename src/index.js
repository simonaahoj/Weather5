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

function currentWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
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

  changeImg(description);
}

function dispalyForcast(response) {
  console.log(response.data.list[0])

    blalba.innerHTML = /*html*/`
      <div> A </div>
      <h1 style="asdsda"></h1>
    `;
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

function changeImg(description) {
  let ElementImg = document.querySelector("#weather-image");
  ElementImg.src = "images/rain.jpg";
  if (description === "Clouds") {
    ElementImg.src = "images/cloudy.jpg";
  }
  if (description === "Rain") {
    ElementImg.src = "images/strog-rain.jpg";
  }
  if (description === "Clear") {
    ElementImg.src = "images/sunny.jpg";
  }
  if (description === "Drizzle") {
    ElementImg.src = "images/rain.jpg";
  }
  if (description === "Showers") {
    ElementImg.src = "images/rain.jpg";
  }
  if (description === "Snow") {
    ElementImg.src = "images/snow.jpg";
  }
  if (description === "Mist") {
    ElementImg.src = "images/foggy.jpg";}
}

