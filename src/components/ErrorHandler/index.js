import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const ErrorHandler = ({ error }) => {
  const { code, message } = error;
  const location = useLocation();
  useEffect(() => {
    switch (code) {
      case '401':
        <Navigate to='/unauthorized' state={{ from: location }} replace />;
        break;
      case '403':
        <Navigate to='/auth' state={{ from: location }} replace />;
        break;
      default:
        <Navigate to='/error' state={{ from: location, message }} replace />;
    }
  }, [code, error, location, message]);
  return;
};
export default ErrorHandler;
