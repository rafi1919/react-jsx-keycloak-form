import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './keycloak';

keycloak
  .init({ onLoad: 'login-required' }) // You can change 'login-required' to 'check-sso' or 'login-sso' as needed
  .then((authenticated) => {
    if (authenticated) {
      console.log('User is authenticated');
      ReactDOM.render(<App />, document.getElementById('root'));
    } else {
      console.error('Authentication failed');
    }
  })
  .catch((err) => console.error('Keycloak initialization error', err));
