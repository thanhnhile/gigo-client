import { useLocation } from 'react-router-dom';

const Error = () => {
  const location = useLocation();

  //const { message } = location?.state;
  console.log(location);
  return (
    <article style={{ padding: '100px' }}>
      <h1>{'Something went wrong'}</h1>
    </article>
  );
};

export default Error;
