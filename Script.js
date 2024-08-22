function renderWeather_Current(icon,weather, city, Condition) {
  let resultContainer = document.querySelector(".Current__Weather");

  // Part One: Temperature, Location, Date & Time
  let partOne = resultContainer.querySelector(".part__One");
  let location = partOne.querySelector(".location");
  let temperature = partOne.querySelector(".temperature");
  let dateSpan = partOne.querySelector(".date");
  let timeSpan = partOne.querySelector(".time");

  location.textContent = city;
  temperature.innerHTML = weather.current.temperature_2m + "&nbsp;<sup>o</sup>C";

  let date = new Date(weather.current.time);
  let dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  let timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

  dateSpan.textContent = date.toLocaleDateString('en-US', dateOptions);
  timeSpan.textContent = date.toLocaleTimeString('en-US', timeOptions);

  // Part Two: Weather Condition, Wind Speed, Rain, Humidity
  let partTwo = resultContainer.querySelector(".part__Two");
  let weatherCondition = partTwo.querySelector(".weather_Condition");
  let iconElement = weatherCondition.querySelector(".icon"); // Selecting the icon element
  iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png"; // Setting the src attribute
  iconElement.alt = Condition;
  let windSpeed = partTwo.querySelector(".wind_speed");
  let rain = partTwo.querySelector(".rain");
  let humidity = partTwo.querySelector(".humidity");

  weatherCondition.querySelector(".text").textContent = Condition;

  // Calculate average wind speed
  let totalWindSpeed = 0;
  for (let i = 0; i < weather.hourly.wind_speed_10m.length; i++) {
    totalWindSpeed += weather.hourly.wind_speed_10m[i];
  }
  let averageWindSpeed = totalWindSpeed / weather.hourly.wind_speed_10m.length;
  windSpeed.querySelector(".text").textContent = Math.round(averageWindSpeed, 2) + " km/h";

  // Calculate average temperature
  let totalTemperature = 0;
  for (let i = 0; i < weather.hourly.temperature_2m.length; i++) {
    totalTemperature += weather.hourly.temperature_2m[i];
  }
  let averageTemperature = totalTemperature / weather.hourly.temperature_2m.length;
  temperature.innerHTML = Math.round(averageTemperature) + "&nbsp;<sup>o</sup>C";

  // Calculate total rain
  let totalRain = 0;
  for (let i = 0; i < weather.hourly.rain.length; i++) {
    totalRain += weather.hourly.rain[i];
  }
  rain.querySelector(".text").textContent = totalRain + " mm";

  // Calculate average humidity
  let totalHumidity = 0;
  for (let i = 0; i < weather.hourly.relative_humidity_2m.length; i++) {
    totalHumidity += weather.hourly.relative_humidity_2m[i];
  }
  let averageHumidity = totalHumidity / weather.hourly.relative_humidity_2m.length;
  humidity.querySelector(".text").textContent = Math.round(averageHumidity) + "%";

  fetchWeather_Forecast(Condition, weather);
}



// function renderWeatherForecast(forecastData, condition) {
//   let resultContainer = document.querySelector(".Weather__Forecast");
//   let dayContainers = resultContainer.querySelectorAll(".day");

//   // Loop through each day container
//   for (let i = 0; i < dayContainers.length && i < forecastData.hourly.time.length / 24; i++) {
//     let dayContainer = dayContainers[i];
//     let dayData = forecastData.hourly;

//     // Calculate start and end index for each day
//     let startIndex = i * 24;
//     let endIndex = (i + 1) * 24;

//     // Initialize variables for average calculation
//     let totalTemperature = 0;
//     let totalRain = 0;
//     let totalWindSpeed = 0;
//     let totalHumidity = 0;

//     // Loop through hourly data to calculate averages for the day
//     for (let j = startIndex; j < endIndex; j++) {
//       totalTemperature += dayData.temperature_2m[j];
//       totalRain += dayData.rain[j];
//       totalWindSpeed += dayData.wind_speed_10m[j];
//       totalHumidity += dayData.relative_humidity_2m[j];
//     }

//     // Calculate averages
//     let averageTemperature = totalTemperature / 24;
//     let averageRain = totalRain / 24;
//     let averageWindSpeed = totalWindSpeed / 24;
//     let averageHumidity = totalHumidity / 24;

//     // Extracting relevant data for the day
//     let temperature = dayContainer.querySelector("li:nth-child(1)");
//     let dateTime = dayContainer.querySelector("li:nth-child(2)");
//     let weatherCondition = dayContainer.querySelector("li:nth-child(3)");
//     let windSpeed = dayContainer.querySelector("li:nth-child(4)");
//     let precipitation = dayContainer.querySelector("li:nth-child(5)");
//     let humidity = dayContainer.querySelector("li:nth-child(6)");

//     // Update content
//     temperature.textContent = averageTemperature.toFixed(1) + "°C";
//     const dateTimeString = forecastData.hourly.time[7]+"AM";
//     const dateTimeArray = dateTimeString.split('T');
//     dateTime.textContent= dateTimeArray.join(' , ');

//     weatherCondition.textContent = condition;
//     windSpeed.textContent = "Wind: " + averageWindSpeed.toFixed(1) + " km/h";
//     precipitation.textContent = "Rain: " + averageRain.toFixed(2) + " mm";
//     humidity.textContent = "Humidity: " + averageHumidity.toFixed(1) + "%";
//   }
// }
function renderWeatherForecast(forecastData, condition) {
  let resultContainer = document.querySelector(".Weather__Forecast");
  let dayContainers = resultContainer.querySelectorAll(".day");

  // Loop through each day container
  for (let i = 0; i < dayContainers.length && i < forecastData.hourly.time.length / 24; i++) {
    let dayContainer = dayContainers[i];
    let dayData = forecastData.hourly;

    // Calculate start and end index for each day
    let startIndex = i * 24;
    let endIndex = (i + 1) * 24;

    // Initialize variables for average calculation
    let totalTemperature = 0;
    let totalRain = 0;
    let totalWindSpeed = 0;
    let totalHumidity = 0;

    // Loop through hourly data to calculate averages for the day
    for (let j = startIndex; j < endIndex; j++) {
      totalTemperature += dayData.temperature_2m[j];
      totalRain += dayData.rain[j];
      totalWindSpeed += dayData.wind_speed_10m[j];
      totalHumidity += dayData.relative_humidity_2m[j];
    }

    // Calculate averages
    let averageTemperature = totalTemperature / 24;
    let averageRain = totalRain / 24;
    let averageWindSpeed = totalWindSpeed / 24;
    let averageHumidity = totalHumidity / 24;

    // Extracting relevant data for the day
    let temperature = dayContainer.querySelector("li:nth-child(1)");
    let dateTime = dayContainer.querySelector("li:nth-child(2)");
    let weatherCondition = dayContainer.querySelector("li:nth-child(3)");
    let windSpeed = dayContainer.querySelector("li:nth-child(4)");
    let precipitation = dayContainer.querySelector("li:nth-child(5)");
    let humidity = dayContainer.querySelector("li:nth-child(6)");

    // Update content
    temperature.textContent = averageTemperature.toFixed(1) + "°C";

    // Calculate date for the forecast day
    let date = new Date(forecastData.hourly.time[startIndex]);
    let dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    dateTime.textContent = date.toLocaleDateString('en-US', dateOptions);

    weatherCondition.textContent = condition;
    windSpeed.textContent = "Wind: " + averageWindSpeed.toFixed(1) + " km/h";
    precipitation.textContent = "Rain: " + averageRain.toFixed(2) + " mm";
    humidity.textContent = "Humidity: " + averageHumidity.toFixed(1) + "%";
  }
}




function fetchWeather_Forecast( condition, weather) {
  renderWeatherForecast(weather, condition);
}

function send_Latitude_Longitude(iconCode,lat, long, city, weather_Condition){
  let url = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&current=temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall&hourly=temperature_2m,relative_humidity_2m,rain,wind_speed_10m";
  fetch(url)
  .then((response) => response.json())
  .then((data) => renderWeather_Current(iconCode,data, city,weather_Condition));
}

//  current weather
function fetchWeather_Current(weather, city){
  const latitude = weather.coord.lat;
  const longitude = weather.coord.lon;
  const weather_Condition = weather.weather[0].description;
  let iconCode = weather.weather[0].icon;
  send_Latitude_Longitude(iconCode,latitude, longitude, city, weather_Condition);
  // console.log(latitude+" "+longitude);
}

function fetchLaititude_Longitude(city){
  let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=409ebcbff65f65044342f7fa9ff48d77";
  fetch(url)
  .then((response) => response.json())
  .then((data) => fetchWeather_Current(data,city));
}

fetchLaititude_Longitude("Delhi");

function getWeather() {
  let cityInput = document.getElementById("city__name").value;
  if (cityInput.trim() !== "") {
    // Clear previous results
    fetchLaititude_Longitude(cityInput);

  } else {
    console.log("Not in list")
    alert("Please enter a valid city name.");
  }
}
