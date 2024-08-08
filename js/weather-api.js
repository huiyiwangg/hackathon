class WeatherApi {
  constructor(key) {
    this.key = key;
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeather(city, units) {
    // what is `this`?!  It's the actual object that called this method.
    // I called that object `api` on line 9 in demo.js
    const url = `${this.baseUrl}?appid=${this.key}&q=${city}&units=${units}`;
    const resp = await axios.get(url);
    return resp.data;
  }
}
