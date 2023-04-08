import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import FormInput from '~/components/Form/FormInput';
import SelectAddress from '../../SelectAddress';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);

const UnAuthenticated = ({
  setAddress,
  address,
  customer,
  handleChange,
  setValidated,
}) => {
  const formInputs = [
    {
      id: 1,
      type: 'text',
      name: 'name',
      placeholder: 'Họ và tên',
      required: true,
    },
    {
      id: 2,
      type: 'phone',
      name: 'phone',
      placeholder: 'Số điện thoại',
      required: true,
      pattern: ValidationRegex.phone.pattern,
      message: ValidationRegex.phone.message,
    },
    {
      id: 3,
      type: 'text',
      name: 'address',
      placeholder: 'Địa chỉ chi tiết',
      required: true,
    },
  ];
  return (
    <>
      <div className={cx('form-control')}>
        {formInputs.map((formInput) => (
          <FormInput
            key={formInput.id}
            value={customer[formInput.name]}
            onChange={handleChange}
            setValidated={setValidated}
            {...formInput}
          />
        ))}
      </div>
      <div className={cx('form-control')}>
        <h4>Địa chỉ </h4>
        <SelectAddress address={address} setAddress={setAddress} />
      </div>
    </>
  );
};

export default UnAuthenticated;
