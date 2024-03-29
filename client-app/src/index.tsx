import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './app/layout/styles.css';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import 'react-toastify/dist/ReactToastify.min.css'
import reportWebVitals from './reportWebVitals';
import 'react-widgets/dist/css/react-widgets.css';
import 'semantic-ui-css/semantic.min.css'
import ScrollToTop from './app/layout/ScrollToTop';
import dateFnsLocalizer from 'react-widgets-date-fns'

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <ScrollToTop />
        <App />
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
