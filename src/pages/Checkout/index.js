import React, { useState } from 'react';
import Customer from '../../components/Order/Customer';
import Order from '../../components/Order/Order/Order';

const style = {
  // checkout_container: {
  //   maxWidth: '70%',
  //   margin: '0 auto',
  // },
  wrapper: {
    color: 'red',
    textAlign: 'center',
    padding: '15px 0',
    marginTop: '40px',
  },
  button: {
    padding: '8px 15px',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--primary)',
    outline: 'none',
    color: 'var(--primary)',
    fontSize: '1.6rem',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'pointer',
  },
};

function Checkout(props) {
  const [page, setPage] = useState(0);
  const handleGetPage = () => {
    switch (page) {
      case 0:
        return <Order />;
      case 1:
        return <Customer />;
      default:
        return <Order />;
    }
  };
  return (
    <div className='min-container'>
      {handleGetPage()}
      <div style={style.wrapper}>
        {page > 0 && (
          <button style={style.button} onClick={() => setPage(page - 1)}>
            Trở lại
          </button>
        )}
        {page < 1 && (
          <button style={style.button} onClick={() => setPage(page + 1)}>
            Tiếp tục
          </button>
        )}
      </div>
    </div>
  );
}

export default Checkout;
