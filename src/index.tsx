import './env';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './static/scss/_Default.scss';
import {Auth0Provider} from "./react-auth0-spa";
import history from "./utils/history";
import dataManagerReduxStore from "./redux/data-manager-redux-store";

const onRedirectCallback = appState => {
  history.push(
      appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={dataManagerReduxStore}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);