import { forecastConstant } from '../_constants';

const defaultState = {
    cityId: '',
    name: '',
    counter: '',
    weather: null,
    forecast: null
};

export const forecastReducer = (state = defaultState, action) => {
    switch(action.type) {
        case forecastConstant.WEATHER:
            return {
                ...state,
                cityId: action.cityId,
                weather: action.weather,
                forecast: null
            };
        case forecastConstant.FORECAST:
            return {
                ...state,
                cityId: action.cityId,
                forecast: action.forecast
            };
        case forecastConstant.CLEAR:
            return {
                ...state,
                forecast: null
            };
        default:
            return state;
    }
};