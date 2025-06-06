export class dataHandler {
  constructor() {
    this.location = null;
    this.data = null;
    this.dataExtract = null;
  }

  Initialize() {
    this.data = this.data.data.timelines[0].intervals[0].values;
    this.dataExtract = {
      temperature: this.data.temperature,
      temperatureApparent: this.data.temperatureApparent,
      weatherCode: this.data.weatherCode,
      cloudCover: this.data.cloudCover,
      precipitationProbability: this.data.precipitationProbability,
      precipitationType: this.data.precipitationType,
      humidity: this.data.humidity,
    };
  }

  postData(data, location) {
    this.data = data;
    this.location = location;
    this.Initialize();
  }

  async checkWeatherCode() {
    try {
      const response = await fetch('./cache/weather.json');
      const weatherCodeData = await response.json();

      return weatherCodeData.weatherCode;
    } catch (error) {
      document.querySelector('.body-section').textContent = `
            There was an error fetching the weather code: ${error}
            `;
      console.error(error);
      return {};
    }
  }

  async getWeatherDescription(code) {
    const weatherCode = await this.checkWeatherCode();
    return weatherCode[code];
  }

  async getForecast() {
    return await this.getWeatherDescription(this.dataExtract.weatherCode);
  }

  getPrecipitationType(precipitationType) {
    const precipitation = {
      0: 'None',
      1: 'Rain',
      2: 'Freezing Rain',
      3: 'Ice Pellets/Sleet',
    };

    return precipitation[precipitationType];
  }

  async getPrecipitation() {
    let precipitationType = this.dataExtract.precipitationType;
    precipitationType = this.getPrecipitationType(precipitationType);
    const precipitationPercentage = this.dataExtract.precipitationProbability;

    return `The precipitation percentage is ${precipitationPercentage}% and the precipitation type is ${precipitationType}.`;
  }

  async getHumidity() {
    const humidity = this.dataExtract.humidity;
    return `The humidity is ${humidity}%`;
  }

  async render() {
    const forcast = await this.getForecast();
    const precipitation = await this.getPrecipitation();
    const humidity = await this.getHumidity();
    document.querySelector('.testing-weather-api').textContent = `
        The temperature in ${this.location} is ${this.dataExtract.temperature}°C
        `;

    document.querySelector('.body-section').textContent = `
        The temperature apparent in ${this.location} is ${this.dataExtract.temperatureApparent}°C
        and the weather is ${forcast}
        `;

    document.querySelector('.other-fields').textContent = `
        ${precipitation} ${humidity}
        `;
  }
}
