import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
