const axios = require("axios");

const URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 3;

async function fetchForecast(location) {
  return await axios({
    url: URL,
    method: "get",
    params: {
      q: location,
      days: FORECAST_DAYS,
      key: process.env.WEATHER_API_KEY,
    },
  })
    .then((response) => {
      const city = response.data.location.name;
      const state = response.data.location.region;
      const country = response.data.location.country;
      const locationName = `${city}, ${state}, ${country}`;

      const weatherData = response.data.forecast.forecastday.map(
        (forecastday) => {
          return {
            date: forecastday.date,
            temperatureMinC: forecastday.day.mintemp_c,
            temperatureMaxC: forecastday.day.maxtemp_c,
            temperatureMinF: forecastday.day.mintemp_f,
            temperatureMaxF: forecastday.day.maxtemp_f,
          };
        }
      );
      return {
        locationName,
        weatherData,
      };
    })
    .catch((error) => {
      console.error(error);
      throw new Error(`Error fetching forecast for ${locationName}`);
    });
}

module.exports = {
  fetchForecast,
};
