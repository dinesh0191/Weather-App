window.addEventListener("load", () => {
  let long;
  let lat;
  let tempratureDescription = document.querySelector(".temprature-description");
  let tempratureDegree = document.querySelector(".temprature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let tempratureSection = document.querySelector(".temprature");
  let tempratureSpan = document.querySelector(".temprature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${long}`;

      fetch(api, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
            "b500b152e7msh7d3919ccc313cb5p1aa464jsn08c373e789a9",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //set dom elements from API
          const { temp } = data.main;
          const { main } = data.weather[0];
          tempratureDegree.textContent = temp;
          tempratureDescription.textContent = main;
          locationTimezone.textContent = data.name;
          // Formula for celsius

          let celsius = temp - 273.15;
          let farenheit = (temp - 273.15) * (9 / 5) + 32;

          //Change temprature to Celsius/Farenheit/Kelvin
          tempratureSection.addEventListener("click", () => {
            if (tempratureSpan.textContent === "K") {
              tempratureSpan.textContent = "C";
              tempratureDegree.textContent = Math.floor(celsius);
            } else if (tempratureSpan.textContent === "C") {
              tempratureSpan.textContent = "F";
              tempratureDegree.textContent = Math.floor(farenheit);
            } else {
              tempratureSpan.textContent = "K";
              tempratureDegree.textContent = temp;
            }
          });
        });
    });
  }

  // Setting time
  setInterval(() => {
    let time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let currentTime = document.querySelector(".current-time");

    hour = hour > 12 ? hour - 12 : hour;
    hour = hour == 0 ? 12 : hour;

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    let timeOfDay = hour > 12 ? "AM" : "PM";

    let str = `${hour}:${minutes}:${seconds} ${timeOfDay}`;

    currentTime.textContent = str;
  }, 1000);
});
