if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    generateWeatherByLatLong(lat, long);
    generateMap(lat, long);
  }

  const input = document.getElementById("input");
  const searchBtn = document.getElementById("search");
  searchBtn.addEventListener("click", function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&units=metric&appid=9ba1428be93cc53800879fcc6b642b6f"
    )
      .then((response) => response.json())
      .then((data) => {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        const { all } = data.clouds;

        document.getElementById("city").innerText = `Weather in ${name}`;
        document.getElementById(
          "desc"
        ).innerText = `Condition : ${description}`;
        document.getElementById(
          "icon"
        ).src = `http://openweathermap.org/img/w/${icon}.png`;
        document.getElementById(
          "temp"
        ).innerHTML = `Temperatur : ${temp}<sup>o</sup>c`;
        document.getElementById(
          "hum"
        ).innerText = `Humidity : ${humidity}%`;
        document.getElementById(
          "ws"
        ).innerText = `Wind Speed : ${speed}km/j`;
        document.getElementById("cl").innerText = `Clouds : ${all}%`;
        document.getElementById(
          "pre"
        ).innerText = `Pressure : ${pressure}mb`;
      })
      .catch((err) => alert(`city doesn't exist!`));
  });

  function generateWeatherByLatLong(lat, long) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=metric&appid=9ba1428be93cc53800879fcc6b642b6f"
    )
      .then((response) => response.json())
      .then((data) => {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity, pressure } = data.main;
        const { speed } = data.wind;
        const { all } = data.clouds;

        document.getElementById("city").innerText = `Weather in ${name}`;
        document.getElementById(
          "desc"
        ).innerText = `Condition : ${description}`;
        document.getElementById(
          "icon"
        ).src = `http://openweathermap.org/img/w/${icon}.png`;
        document.getElementById(
          "temp"
        ).innerHTML = `Temperatur : ${temp}<sup>o</sup> C`;
        document.getElementById(
          "hum"
        ).innerText = `Humidity : ${humidity}%`;
        document.getElementById(
          "ws"
        ).innerText = `Wind Speed : ${speed}km/j`;
        document.getElementById("cl").innerText = `Clouds : ${all}%`;
        document.getElementById(
          "pre"
        ).innerText = `Pressure : ${pressure}mb`;
      })
      .catch((err) => alert(`city doesn't exist!`));
  }

  function generateMap(lat, long) {
    // Initialize the map and assign it to a variable for later use
    // there's a few ways to declare a VARIABLE in javascript.
    // you might also see people declaring variables using `const` and `let`
    var map = L.map("map", {
      // Set latitude and longitude of the map center (required)
      center: [lat, long],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 11,
    });

    // Create a Tile Layer and add it to the map
    var tiles = new L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: "8",
      }
    ).addTo(map);

    var marker = L.marker([lat, long], {
      draggable: true,
      title: "",
      opacity: 0.75,
    });

    marker.addTo(map);

    marker.on("dragend", function (e) {
      let lat = e.target._latlng.lat;
      let long = e.target._latlng.lng;
      generateWeatherByLatLong(lat, long);
    });
  }