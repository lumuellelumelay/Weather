// My javascript UI code goes here
// Display the weather data on the UI
// API testing
import { getTemperature } from './data/api_weather.js';

// Helper functions
// fetching the weather code json
const checkWeatherCode = async () => {
  try {
    const response = await fetch('./cache/weather.json');
    const weatherCodeData = await response.json();

    return weatherCodeData.weatherCode;
  } catch (error) {
    console.error(error);
    return {};
  }
};

// getting the weather description
const getWeatherDescription = async (code) => {
  const weatherCode = await checkWeatherCode();
  return weatherCode[code];
};
//

// getting the forecast for the location
const getForecast = (location) => {
  getTemperature(location).then(async (data) => {
    const getWeatherCode =
      data.data.timelines[0].intervals[0].values.weatherCode;

    const weatherForecast = await getWeatherDescription(
      getWeatherCode.toString()
    );

    // Display the weather data on the UI
    document.querySelector(
      '.testing-weather-api'
    ).textContent = `The temperature in ${location} is ${data.data.timelines[0].intervals[0].values.temperature}°C`;

    document.querySelector('.body-section').textContent = `
    The temperature apparent in ${location} is ${data.data.timelines[0].intervals[0].values.temperatureApparent}°C
    and the weather is ${weatherForecast}
    `;
  });
};

const inputLocation = document.querySelector('.input-location');
const buttonGetLocation = document.querySelector('.input-location-button');

buttonGetLocation.addEventListener('click', async (e) => {
  e.preventDefault();

  let location = inputLocation.value;
  inputLocation.value = '';

  if (location === '') {
    document.querySelector('.body-section').textContent =
      'Please enter a location';
  }

  getForecast(location);
});

// Initial display when the page loads
document.addEventListener('DOMContentLoaded', () => {
  getForecast('Manila');
});
