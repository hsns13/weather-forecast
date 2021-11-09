import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './_store/store';
import { ErrorBoundary } from './ErrorBoundary';

/**
 * import style
 */
import './_style/style.scss';

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root'));