import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import GlobalStyles from 'comps/GlobalStyles';
import AuthProvider from '~/contexts/AuthProvider';
import CartProvider from './contexts/CartContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles>
        <AuthProvider>
          <CartProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
          </CartProvider>
        </AuthProvider>
      </GlobalStyles>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
