let userInput = document.querySelector(".user__input");
let cityName = document.querySelector(".city__name");
let gradus = document.querySelector(".gradus");
let cityTime = document.querySelector(".city__time");
let weatherType = document.querySelector(".weather__type");
let cloudly = document.querySelector(".cloudly");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let imgWeather = document.querySelector(".weather__img");
let searchBtn = document.querySelector(".search__btn");
let weather = function (country) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=44d37f22c06d4dbba27165419220204&q=${country}&aqi=no`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (rest) {
      let date = new Date();
      let a = String(date).split(" ").slice(0, 4).join(" ");
      gradus.textContent = `${rest.current.temp_c}`;
      cityName.textContent = `${rest.location.name}`;
      cloudly.textContent = `${rest.current.cloud}%`;
      humidity.textContent = `${rest.current.humidity}%`;
      wind.textContent = `${rest.current.vis_km}km/h`;
      cityTime.textContent = `${
        String(rest.current.last_updated).split(" ")[1]
      } - ${a}`;
      weatherType.textContent = `${rest.current.condition.text}`;
      imgWeather.src = `${rest.current.condition.icon}`;
    });
};
fetch("http://ip-api.com/json")
  .then(function (response) {
    return response.json();
  })
  .then(function (payload) {
    weather(`${payload.country}`);
  });

userInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    weather(`${userInput.value}`);
    userInput.value = "";
  }
});
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  weather(`${userInput.value}`);
  userInput.value = "";
});
