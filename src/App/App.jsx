import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { alertActions } from '../_store/_actions';

import { Weather } from '../Pages/WeatherForecast';

import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';

const history = createBrowserHistory();

class App extends Component {
    onAlertClick = (e) => {
        this.props.clearError();
    }

    render() {
        const { alertContainer } = this.props;

        return (
            <Fragment>
                {
                    alertContainer &&
                    <div className={['alert', `alert--${alertContainer.type}`].join(' ')} onClick={this.onAlertClick}>
                        {alertContainer.message}
                    </div>
                }
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

const mapStateToProps = ({ alertContainer }) => {
    return {
        alertContainer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearError: () => dispatch(alertActions.clear())
    };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export {
    connectedApp as App
}