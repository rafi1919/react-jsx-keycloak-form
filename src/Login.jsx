import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { useNavigate } from 'react-router-dom';

let initOptions = {
  url: 'https://localhost:8080/',
  realm: 'YOUR REALM',
  clientId: 'YOUR CLIENT ID',
  onLoad: 'check-sso',
  KeycloakResponseType: 'code',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
};

let kc = new Keycloak(initOptions);

function App() {
  const [infoMessage, setInfoMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const login = () => {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'YOUR CLIENT ID');
    formData.append('client_secret', 'YOUR CLIENT SECRET');
    formData.append('username', username); 
    formData.append('password', password); 

    axios({
      method: 'post',
      url: 'https://localhost:8080/realms/<YOUR_REALM>/protocol/openid-connect/token',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: 'admin', 
        password: 'client-secret',
      },
    })
      .then((response) => {
        const token = response.data.access_token;
        console.log('Access token:', token);
        setInfoMessage('Login Successful');
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setInfoMessage('Login Failed');
      });
  };

  return (
    <div className="App">
      <div className="grid">
        <div className="col-12">
          <h1>Login Auth React App</h1>
        </div>
        <div className="col-12">
          <h1 id="app-header-2">Secured with Keycloak</h1>
        </div>
      </div>
      <div className="grid">
        <div className="col">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={login} className="m-1">
            Login
          </button>
        </div>
      </div>
      <div className="grid">
        <div className="col-2"></div>
        <div className="col-8">
          <h3>{infoMessage}</h3>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default App;
