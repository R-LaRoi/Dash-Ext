// <------ TIME CARD -------->

function currentTime() {
  const getTime = new Date();
  // let clock = getTime.getHours() + ":" + getTime.getMinutes();
  let clock = getTime.toLocaleTimeString("en-us", { timeStyle: "short" });
  document.getElementById("show-time").innerText = clock;
}
setInterval(currentTime, 1000);
currentTime();

// < ----------- OPEN WEATHER API  -------------->

let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.daily[0].weather[0].main);
      // console.log(data.current.temp);
      // console.log(data.current.weather[0].description);

      let iconUrl = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

      document.querySelector("#daily").innerHTML = `
      <div>${Math.round(data.current.temp)}</div>
      <div>${data.current.weather[0].main}</div>
      <img src ="${iconUrl}"></img>
      `;

      document.getElementById("five").innerHTML = `
<div>${data.daily[0].weather[0].main}</div>
`;

      let forecast = data.daily;
      let fiveDay = forecast.map((info) => {
        return `
        <div class='day'>
        <div>${Math.round(info.temp.max)} </div>
          <div>${info.weather[0].main} </div>
        <div>${Math.round(info.temp.min)} </div>
        </div>`;
      });

      document.getElementById("five").innerHTML = fiveDay.slice(0, 5);
      console.log(fiveDay.length);
    });
});

// <---------- FACT GENERATOR ---------------->

fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.text);
    document.getElementById("fact").innerHTML = `
    <div>${data.text}</div>
    `;
  });

// <----------------- CURRENCY EXCHANGE ---------->

fetch(
  `  https://api.freecurrencyapi.com/v1/latest?apikey=4yDnk5qAuOZY0R4e0LB8QyxiV5z1vBWJEDh52BN9&currencies=EUR%2CUSD%2CZAR%2CJPY`
)
  .then((response) => response.json())
  .then((currency) => {
    document.getElementById("currency").innerHTML = `
    <li>🇪🇺 €: ${currency.data.EUR}</li>
    <li>🇺🇸 $: ${currency.data.USD}<li>
     <li>🇿🇦 R: ${currency.data.ZAR}<li>
      <li>🇯🇵 ¥ ${currency.data.JPY}<li>`;
  });
