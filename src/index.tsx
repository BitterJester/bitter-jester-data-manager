import './env';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './static/scss/_Default.scss';
import dataManagerReduxStore from "./redux/data-manager-redux-store";

ReactDOM.render(
    <Provider store={dataManagerReduxStore}>
      <App />
    </Provider>,
  document.getElementById("root")
);