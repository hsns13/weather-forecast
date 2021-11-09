import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import reducers
import {
    alertReducer as alertContainer,
    forecastReducer as forecastContainer
} from './_reducers';

export const store = createStore(combineReducers({
    alertContainer,
    forecastContainer
}), applyMiddleware(thunkMiddleware));