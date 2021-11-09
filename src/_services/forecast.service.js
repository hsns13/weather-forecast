import { config } from '../_config/dev';
import handleResponse from './helper';

const getWeather = (cityId) => {
    const apiToCall = config.weather(cityId);
    return fetch(apiToCall).then(handleResponse);
};

const getForecast = (cityId) => {
    const apiToCall = config.forecast(cityId);
    return fetch(apiToCall).then(handleResponse);
};

export const forecastService = {
    getWeather,
    getForecast
};