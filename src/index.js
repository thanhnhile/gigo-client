import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import GlobalStyles from 'comps/GlobalStyles';
import AuthProvider from '~/contexts/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </GlobalStyles>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
