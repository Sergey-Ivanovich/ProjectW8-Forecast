function weatherRefresh(response) {
  let tempElement = document.querySelector("#shownTemp");
  let cityNameElement = document.querySelector("h1");
  let currentTemp = Math.round(response.data.temperature.current);
  let conditionElement = document.querySelector("#shown-condition	");
  let timeShown = document.querySelector("#time-shown");
  let currentTime = response.data.time;
  let date = new Date(response.data.time * 1000);
  let shownHumidity = document.querySelector("#shown-humidity");
  let shownWindSpeed = document.querySelector("#shown-windspeed");
  let shownIcon = document.querySelector("#weather-icon");
  let icon_url = response.data.condition.icon_url;

  shownIcon.innerHTML = `<img src="${icon_url}" />`;
  shownWindSpeed.innerHTML = `${response.data.wind.speed}Km/h`;
  timeShown.innerHTML = formatDate(date);
  shownHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  conditionElement.innerHTML = response.data.condition.description;
  cityNameElement.innerHTML = response.data.city;
  tempElement.innerHTML = `${currentTemp} `;
}

function formatDate(date) {
  let min = date.getMinutes();
  let hour = date.getHours();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[date.getDay()];

  if (min < 10) {
    min = `0${min}`;
  }

  return `${day} ${hour}:${min}`;
}

function apiSearch(city) {
  let apiKey = `oe3107c03bbf1b061844a8c3d518t9b3`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(weatherRefresh);
}

function cityHandle(event) {
  event.preventDefault();

  let city = document.querySelector(`#city-box`);
  apiSearch(city.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = [`Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let forecastHtml = ``;

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="day-container">
    <div class="day-info">
    <span class="forecast-day"> ${day} </span>
    
    <br />
    <span class="weather-emoji"> ☀️ </span><br />
    
    <span class="day-temp">
    <span class="max-day-temp"> 31°c</span>
    <span class="min-day-temp"> 28°c</span>
    </span>
    </div>
    </div>
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityHandle);

apiSearch(`Moscow`);

displayForecast();
