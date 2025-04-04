async function getWeather(e) {
  e.preventDefault();

  let input = document.querySelector("#search");
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=HWF89B462LUJN728FEKUWLBDW`,
      { mode: "cors" }
    );
    console.log(response);
    let data = await response.json();
    console.log(data);
    showWeather(data);
  } catch (err) {
    console.log(err);
  }
}

function showWeather(data) {
  const container = document.querySelector(".weather-container");
  const div = document.createElement("div");
  // to create and appended time
  const time = document.createElement("span");
  time.innerHTML = `${data.currentConditions.datetime}`;

  //Image of weather type
  const img = document.createElement("img");
  img.src = `${data.currentConditions.icon}`;
  // Show Temp in F
  const temp = document.createElement("h2");
  temp.innerHTML = `${data.currentConditions.temp}`;

  container.appendChild(div);
  div.appendChild(time);
  div.appendChild(img);
  div.appendChild(temp);
}

const form = document.querySelector(".form");

form.addEventListener("submit", getWeather);
