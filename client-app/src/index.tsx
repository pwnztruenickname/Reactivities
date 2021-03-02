import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './app/layout/styles.css';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import ScrollToTop from './app/layout/ScrollToTop';

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
