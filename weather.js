const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "50eca4a0404d8601097a02ac9ea64f8b";
function getWeather(lat, lng) {
  // 데이터를 얻기 위해 fetch라는 것을 사용함.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ) // then : 데이터가 완전히 들어온 다음에 함수를 호출하는 역할.
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}º @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  //coordsObj JSON 형식에서 string으로 저장함.
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    //   latitude : latitude,
    //   longitude : longitude
    //   객체의 변수 이름과 객체의 key의 이름이 같으면 하단과 같은 형식으로 표현할 수 있음.
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadedCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    // parse : string -> JSON 형식으로 변환
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init() {
  loadedCoords();
}
init();
