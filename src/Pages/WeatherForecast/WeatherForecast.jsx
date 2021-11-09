import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { forecastActions } from '../../_store/_actions';

import Button from '../../_components/Button';
import { TableView } from '../../_components/TableView';

import { fahrenheitToCelcius, capitalizeFirstLetter } from '../../_helper';

class WeatherForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: 6167865,
            selectedCityId: 6167865,
            selectedCity: null,
            cityList: [
                {
                    id: 6167865,
                    name: 'Toronto',
                    country: 'CA'
                },
                {
                    id: 6094817,
                    name: 'Ottawa',
                    country: 'CA'
                },
                {
                    id: 1850147,
                    name: 'Tokyo',
                    country: 'JP'
                }
            ],
            columnList: ['Date', 'Temp', 'Min Temp', 'Max Temp', 'Wind', 'Description'],
            isButtonOpen: false,
            buttonName: ['See Forecast', 'Close']
        };
    }

    componentDidMount() {
        // do default network call for the default selected value.
        this.props.getWeather(this.state.defaultValue);
    }

    fillDropDown = () => {
        const cityList = [
            <option key="cityNegative" value="-1">
                Select City
            </option>
        ];

        const optionsList = this.state.cityList.map(item => {
            return <option key={item.id} value={item.id}>
                {item.name}
            </option>
        });

        return [cityList, ...optionsList];
    }

    onSelectChange = (event) => {
        const cityId = event.target.value;
        if(cityId < 0) return;

        if (cityId) {
            this.setState((prevState) => ({
                selectedCityId: cityId,
                selectedCity: prevState.cityList.find(f => f.id === parseInt(cityId)).name,
                isButtonOpen: false
            }));
            this.props.getWeather(cityId);
        }
    }

    onClick = (e) => {
        if (!this.state.isButtonOpen) {
            this.props.getForecast(this.state.selectedCityId);
        } else {
            this.props.clearForecast(this.state.selectedCityId);
        }

        this.setState((prevState) => ({
            isButtonOpen: !prevState.isButtonOpen
        }));
    }

    render() {
        const { weather, forecast } = this.props;

        let main = '', description = '', temp = '', wind = '';

        if (weather) {
            main = capitalizeFirstLetter(weather.weather[0].main);
            description = capitalizeFirstLetter(weather.weather[0].description);

            temp = fahrenheitToCelcius(weather.main.temp);
            wind = weather.wind.speed;
        }

        return (
            <Fragment>
                <div className="forecast__dropdown">
                    <span>City : </span>
                    <select name="cities" defaultValue={this.state.defaultValue} onChange={this.onSelectChange}>
                        {
                            this.fillDropDown()
                        }
                    </select>
                </div>
                <div className="forecast__description">
                    <div className="forecast__description__main">{main}</div>
                    <div className="forecast__description__description">{description}</div>
                    <div className="forecast__description__temp">{temp} <span>&#8451;</span></div>
                    <div className="forecast__description__wind">Wind <span>{wind}</span> m/sec</div>
                </div>
                <div className="forecast__button">
                    <Button onClick={this.onClick} name={this.state.isButtonOpen ? this.state.buttonName[1] : this.state.buttonName[0]}>
                    </Button>
                </div>
                {
                    forecast &&
                    (<TableView columnList={this.state.columnList} dataList={forecast.list} />)
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { forecastContainer } = state;
    return {
        weather: forecastContainer.weather,
        forecast: forecastContainer.forecast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWeather: (cityId) => dispatch(forecastActions.startGetWeather(cityId)),
        getForecast: (cityId) => dispatch(forecastActions.startGetForecast(cityId)),
        clearForecast: (cityId) => dispatch(forecastActions.clearForecast(cityId))
    };
};

const connectedWeatherForecast = connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);

export {
    connectedWeatherForecast as Weather
}