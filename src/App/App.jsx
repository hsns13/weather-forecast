import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Weather } from '../Pages/WeatherForecast';

import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';

const history = createBrowserHistory();

export class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path="/" component={Weather} exact />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </div>
                    </Router>
                </div>
                <Footer />
            </Fragment>
        );
    }
}