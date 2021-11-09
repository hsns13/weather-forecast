import { forecastConstant } from '../_constants';
import { forecastService } from '../../_services';
import { alertActions } from './alert.action';

const getWeather = (cityId, weather) => ({
    type: forecastConstant.WEATHER,
    cityId,
    weather
});

const getForecast = (cityId, forecast) => ({
    type: forecastConstant.FORECAST,
    cityId,
    forecast
});

const clearForecast = (cityId) => ({
    type: forecastConstant.CLEAR,
    cityId
});

// service call
const startGetWeather = (cityId) => {
    return (dispatch, getState) => {
        forecastService.getWeather(cityId).then(result => {
            dispatch(getWeather(cityId, result));
        }).catch(error => {
            dispatch(alertActions.error(error.toString()));
        });
    };
};

const startGetForecast = (cityId) => {
    return (dispatch, getState) => {
        forecastService.getForecast(cityId).then(result => {
            dispatch(getForecast(cityId, result));
        }).catch(error => {
            dispatch(alertActions.error(error.toString()));
        });
    };
}

export const forecastActions = {
    startGetWeather,
    startGetForecast,
    clearForecast
};