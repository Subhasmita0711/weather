function getWeather() {
        const apiKey = "53e9fcd8553dea6dc59f29d722ec89e4";
        const city = document.getElementById("city").value;
      
        if (!city) {
          alert("Please enter a city name🥹");
        }
      
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      
        fetch(currentWeatherUrl)
          .then((response) => response.json())
          .then((data) => {
            displayWeather(data);
          })
          .catch((error) => {
            console.error("Error fecthing current weather data:", error);
            alert("Error fetching current weather data. please try again later...");
          });
      
        fetch(forecastUrl)
          .then((response) => response.json())
          .then((data) => {
            displayHourlyForecast(data.list);
          })
          .catch((error) => {
            console.error("Error fecthing hourly forecast data:", error);
            alert("Error fetching hourly forecast data. please try again later...");
          });
      }
      
      function displayWeather(data) {
        const tempDivInfo = document.getElementById("temp-div");
        const weatherInfoDiv = document.getElementById("weather-info");
        const weatherIcon = document.getElementById("weather-icon");
        const hourlyForecastDiv = document.getElementById("hourly-forecast");
      
        weatherInfoDiv.innerHTML = ' ';
        hourlyForecastDiv.innerHTML = ' ';
        tempDivInfo.innerHTML = ' ';
      
        if (data.cod === '404') {
          weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
          const cityName = data.name;
          const temperature = Math.round(data.main.temp - 273.15);
          const description = data.weather[0].description;
          const iconCode = data.weather[0].icon;
          const iconUrl = ` https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
          const temperatureHTML = `<p>${temperature}℃</p>`;
      
          const weatherHTML = `
          <p>${cityName}<p>
          <p>${description}</p>`;
      
          tempDivInfo.innerHTML = temperatureHTML;
          weatherInfoDiv.innerHTML = weatherHTML;
          weatherIcon.src = iconUrl;
          weatherIcon.alt = description;
      
          showImage();
        }
      }
      
      function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById("hourly-forecast");
      
        const next24Hours = hourlyData.slice(0, 8);
      
        next24Hours.forEach((item) => {
          const dateTime = new Date(item.dt * 1000);
          const hours = dateTime.getHours();
          const temperature = Math.round(item.main.temp - 273.15);
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
          const hourlyItemHTML = `
          <div class="hourly-item">
        <span>${hours}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}℃</span>
        </div>`;
      
        hourlyForecastDiv.innerHTML += hourlyItemHTML;
        });
      }
      
      function showImage() {
        const weatherIcon = document.getElementById("weather-icon");
        weatherIcon.style.display = "block";
      }
         