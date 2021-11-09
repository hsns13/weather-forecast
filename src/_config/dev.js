const config = {
    apiUrl: 'http://api.openweathermap.org/data/2.5/',
    appId: '538882fc8387290c6cee83f313a6acf5',
    weather(cityId) {
        return `${this.apiUrl}weather?id=${cityId}&units=imperial&appid=${this.appId}`;
    },
    forecast(cityId) {
        return `${this.apiUrl}forecast?id=${cityId}&units=imperial&appid=${this.appId}`;
    }
};

export {
    config
};