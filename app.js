import { dataHandler } from './dataHandler.js';
import { getWeatherData } from './data/api_weather.js';

const weatherHandler = new dataHandler();

// for future GeoLocation API JSON
const fetchLocation = (location = 'Manila') => {
  return location;
};

const fetchWeatherData = (location) => {
  return getWeatherData(location);
};

// const helperGetWeatherData = async (location) => {
//   const data = await fetchWeatherData(location);
//   return data;
// };

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

  const data = await fetchWeatherData(location);

  weatherHandler.postData(data, location);
  weatherHandler.render();
});

document.addEventListener('DOMContentLoaded', async () => {
  let location = fetchLocation();
  let data = await fetchWeatherData(location);
  weatherHandler.postData(data, location);
  weatherHandler.render();
});
