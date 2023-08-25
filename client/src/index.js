import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import App from './App';
import axios from 'axios';
import store from "./redux/store";

// Configuración global de la base URL para axios
axios.defaults.baseURL = "http://localhost:3001";

// Crear el punto de inicio para la renderización
const root = createRoot(document.getElementById('root'));

// Renderizar la aplicación dentro de un StrictMode
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();