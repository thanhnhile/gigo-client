import React from 'react';
import { useParams } from 'react-router-dom';
import Customerinfo from '~/components/Personal/CustomerInfo';

const AddCustomerAddress = () => {
  const { id } = useParams();
  return (
    <div className='min-container'>
      <h2>Thông tin giao hàng</h2>
      <Customerinfo customerId={id} />
    </div>
  );
};

export default AddCustomerAddress;
