const form = document.getElementById("form");
const weatherListEl = document.getElementById("weather-list");
const errorEl = document.getElementById("error");

const weatherList = [];

// We instantiate a new WeatherApi object here...
// ...and use it in the submit handler on line 20
const api = new WeatherApi("b11eee40c375ebec5ae2953950f46d2b");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  resetError();

  const city = event.target.city.value;
  const units = event.target.units.value;

  try {
    const data = await api.getWeather(city, units);

    const weatherInfo = {
      data,
      units,
    };

    weatherList.push(weatherInfo);
    render();
  } catch (error) {
    // we get here ONLY if an error occurs in the TRY block
    const message = error.response.data.message;
    displayError(message);
  }
});

////////
////////
function displayWeather(weatherInfo) {
  const data = weatherInfo.data;
  const units = weatherInfo.units;

  const max = data.main.temp_max;
  const min = data.main.temp_min;
  const symbol = getUnitSymb(units);

  const content = `${data.name}: Max temp: ${max}${symbol}, min temp: ${min}${symbol}`;

  const weatherEl = createLi("weather", content);
  weatherListEl.append(weatherEl);
}

function getUnitSymb(units) {
  return units === "metric" ? "°C" : "°F";
}

function displayError(message) {
  errorEl.innerText = `Error! ${message}`;
  form.classList.add("form--error");
}

function render() {
  weatherListEl.replaceChildren();
  weatherList.forEach(displayWeather);
}

function createLi(className, text = "") {
  const li = document.createElement("li");
  li.className = className;
  li.innerText = text;
  return li;
}

function resetError() {
  form.classList.remove("form--error");
  error.innerText = "";
}

// When invoked, this ASYNC function will make a POST request, and console.log the response.
// uncomment line 108 to see it in action:
async function postRequestExample() {
  const payload = {
    name: "Apple MacBook Pro 16",
    data: {
      year: 2019,
      price: 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
    },
  };

  try {
    const resp = await axios.post("https://api.restful-api.dev/objects", payload);
    // check the network tab in devtools!
    console.log(resp.data);
  } catch (e) {
    console.log("something went wrong");
  }
}

postRequestExample()
