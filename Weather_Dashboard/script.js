const cityName = document.querySelector(".inputCityName");
const temp = document.querySelector(".temp");
const humidityField = document.querySelector(".humidity");
const windSpeedField = document.querySelector(".windSpeed");
const btn = document.querySelector("#location");
const error = document.querySelector(".error");
const fetchAPIWeatherIcon = document.querySelector(".fetchAPIWeatherIcon");
const fiveDaysForecastWeather = document.querySelector(
  ".fiveDaysForecastWeather",
);

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (cityName.value.trim() === "") {
    error.textContent = "Please enter any city name!";
    return;
  }
  //   city = cityName.value.trim();
  //   const apiKey = `788c7d2624aca7ca17cf60a9eb17e95e`;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const temperature = data.main.temp;
  //       temp.textContent = temperature;
  //       console.log(temperature);
  //     });
  const success = await getWeather();
  if (success) {
    getFiveDayForecast();
  }
});

//fetch data related to weather
async function getWeather() {
  city = cityName.value.trim();
  const apiKey = `788c7d2624aca7ca17cf60a9eb17e95e`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === "404") {
    console.log(data.cod);

    error.textContent = "Please enter a valid city name!";
    console.log("Executed");
    return false;
  } else {
    error.textContent = "";
  }

  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  console.log(data.weather[0].icon);

  const wIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  fetchAPIWeatherIcon.innerHTML = `<img class="currentIcon" src="${wIcon}" alt="weather icon">`;

  temp.textContent = `Temperature:    ${temperature}°C`;
  humidityField.textContent = `Humidity:    ${humidity}%`;
  windSpeedField.textContent = `WindSpeed:    ${windSpeed}m/s`;
  // console.log(temperature);
  // console.log(humidity);
  // console.log(windSpeed);

  // clear the input box
  // cityName.value = "";
  fiveDaysForecastWeather.innerHTML = "";
  return true;
}

async function getFiveDayForecast() {
  const city = cityName.value.trim();
  const apiKey = `788c7d2624aca7ca17cf60a9eb17e95e`;
  const fiveDaysAPIfetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(fiveDaysAPIfetchUrl);
  const data = await response.json();

  //we will get 5 * 8 data = 40 records bcz it will give every 3hrs record
  // one data per day
  // console.log(data.list);

  if (data.cod === "404") {
    error.textContent = "Please enter a valid city name!";
    // console.log("Executed");

    return false;
  } else {
    error.textContent = "";
  }

  const nextDays = data.list.filter((item) => {
    if (item.dt_txt.includes("12:00:00")) {
      let icon = item.weather[0].icon;
      console.log(icon);
      const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      // console.log(url);
      console.log(item.dt_txt.split(" ")[0]);

      fiveDaysForecastWeather.innerHTML += `<div class="forecastDay">
          <div id="icon"><img class="icon" src="${url}" alt="weather icon"></div>
          <h4 class="day">${item.dt_txt.split(" ")[0]}</h4>
          <p class="tempOfDay">"${item.main.temp}°C"</p>
        </div>`;
    }

    // return item.main.temp;
  });
}
