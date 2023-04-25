// TODO Commented code is a part of auto localization future which is not finished. It is using build in browser localization API as well as google API to translate latitude, longitude to city name. Please feel free to contribute.
// if (navigator.geolocation) {
//   console.log("Navigator supported");
// } else {
//   console.log("Navigator not supported");
//   alert("Geolocation is not supported. Please try from different device.");
// }

// document.querySelector(".search-box i").addEventListener("click", () => {
//   // Get geolocation
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// });

// // Getting correct geolocation
// function successCallback(position, weatherApi) {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   const userLocation = `${latitude}/${longitude}`;

//   // Calculating city name by using google maps API
//   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const city = data.address.city;
//       console.log(`City name: ${city}`);
//     })
//     .catch((error) => {
//       console.error(`Error fetching city name: ${error}`);
//     });

//   console.log(userLocation);
// }
// // Error
// function errorCallback(error) {
//   console.error(`Error retrieving location: ${error.message}`);
// }

const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
weatherBox.classList.remove(".fadeIn");
weatherBox.style.display = "none";
search.addEventListener("click", getDataFromInput);
document.querySelector(".search-box input").addEventListener("keypress", (e) => {
  if (e.code === "Enter") getDataFromInput();
});

function getDataFromInput() {
  const city = document.querySelector(".search-box input").value;
  if (city === " ") return;
  
  weatherBox.style.display = "block";
  const weatherApi = {
    getData: function (location) {
      // ! Insert your key here.
      let key = `3ebc76840b7e45bc94b204259232304&q`;
      // Fetching data form API
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${key}=${location}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Creating const-s to hold values from API data
          const image = document.querySelector(".weather-img-box img");
          const time = data.location.localtime;
          const country = data.location.country;
          const tempC = data.current.temp_c;
          const windSp = data.current.wind_kph;
          const windDir = data.current.wind_dir;
          const humidity = data.current.humidity;
          const pressure = data.current.pressure_mb;
          weatherBox.classList.add(".fadeIn");
          // Inserting data to html
          document.querySelector(".temp-c").textContent = tempC + "℃";
          document.querySelector(".user-location").textContent =
            city.charAt(0).toUpperCase() + city.slice(1) + ", " + country;
          document.querySelector(".time").textContent = time;
          document.querySelector(".wind-speed").textContent = windSp;
          document.querySelector(".humidity").textContent = humidity;
          document.querySelector(".pressure").textContent = pressure;
          document.querySelector(".wind-directory").textContent = windDir;
          const sourceImage = data.current.condition.icon;
          console.log(data.current.condition.text);
          image.src = sourceImage;
          image.alt = data.current.condition.text;
          image.title = data.current.condition.text;
        })
        .catch((error) => console.error(error));
    },
  };

  // retrieve data form user typed location
  weatherApi.getData(city);
};
