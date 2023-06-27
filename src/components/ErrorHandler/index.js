import React from 'react';
const MyFallbackComponent = ({ error, resetErrorBoundary }) => {
  const {
    message,
    response: { data },
  } = error;
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{message}</pre>
      <pre>{data.status}</pre>
      <pre>{data.error}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default MyFallbackComponent;
