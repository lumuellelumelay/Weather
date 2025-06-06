// Getting the temperature and apparent temperature for the next 6 hours
export let location = 'Manila';

const fields = [
  'temperature',
  'temperatureApparent',
  'weatherCode',
  'cloudCover',
  'precipitationProbability',
  'precipitationType',
  'humidity',
];
const units = 'metric';

const url = 'url_key';

export const getWeatherData = async (locationName) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip, br',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      location: locationName,
      fields: fields,
      units: 'metric',
      timesteps: ['1h'],
      startTime: 'now',
      endTime: 'nowPlus6h',
      dailyStartHour: 6,
    }),
  };

  const response = await fetch(url, options)
    .then((request) => request.json())
    .catch((err) => console.error(err));

  return response;
};
