import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import GlobalStyles from 'comps/GlobalStyles';
import AuthProvider from '~/contexts/AuthProvider';
import CartProvider from '~/contexts/CartProvider';
import MyFallbackComponent from './components/ErrorHandler';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route
                path='/*'
                element={
                  <ErrorBoundary FallbackComponent={MyFallbackComponent}>
                    <App />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </GlobalStyles>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
