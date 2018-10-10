import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
  document.getElementById('root')
);
registerServiceWorker();
