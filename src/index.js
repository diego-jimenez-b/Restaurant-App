import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './store/AuthContextProvider';
import { BrowserRouter } from 'react-router-dom';
import OrderContextProvider from './store/OrderContextProvider';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <App />
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
