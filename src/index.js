import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';
import "../src/index.css"
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './context/user-context';
import { CartContextProvider } from './context/cart-context';

const client = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);