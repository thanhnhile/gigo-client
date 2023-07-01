import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import classNames from 'classnames/bind';
import styles from './ErrorPage.module.scss';
import Clickable from '../Clickable';

const cx = classNames.bind(styles);

const GlobalErrorBoundary = ({ children }) => {
  //const { resetBoundary } = useErrorBoundary();
  // Define your error handling logic here
  const handleFallback = (error, info) => {
    // Handle the error and display a fallback UI
    console.error(error);
    console.log(info);
    // You can display a custom error message or redirect to an error page
    return (
      <div class={cx('message')}>
        <h1>{error?.errCode}</h1>
        <h3>{error?.errMsg}</h3>
        <Clickable text='Try again' outline />
      </div>
    );
  };

  return (
    <ErrorBoundary FallbackComponent={handleFallback} onError={handleFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
