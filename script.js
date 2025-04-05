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
    showWeather(data, input);
  } catch (err) {
    console.log(err);
  }
}

async function getGif(weather) {
  try {
    let response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=GtXFG85Z628J6imYd8CXUI0SXcuhK8ol&s=${weather}`,
      { mode: "cors" }
    );
    let dataGif = await response.json();
    console.log(dataGif.data.images.original.url);
    return dataGif;
  } catch (err) {
    console.log(err);
  }
}

async function showWeather(data) {
  const container = document.querySelector(".weather-container");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  let gifResponse = await getGif(data.currentConditions.icon);

  const div = document.createElement("div");
  // to create and appended time
  const h3 = document.createElement("h3");
  h3.innerHTML = `Current local time: ${data.currentConditions.datetime}`;

  const h2 = document.createElement("h2");
  h2.innerHTML = `It's A ${data.currentConditions.icon}`;
  //Image of weather type
  const img = document.createElement("img");
  img.src = `${gifResponse.data.images.original.url}`;
  // Show Temp in F
  const temp = document.createElement("h2");
  temp.innerHTML = `${data.currentConditions.temp} °F`;

  container.appendChild(div);
  div.appendChild(h3);
  div.appendChild(h2);
  div.appendChild(temp);
  div.appendChild(img);
}

const form = document.querySelector(".form");

form.addEventListener("submit", getWeather);
