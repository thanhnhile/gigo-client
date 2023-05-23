/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import className from 'classnames/bind';
import styles from './CustomerInfo.module.scss';
import Clickable from '~/components/Clickable';
import SelectAddress from '~/components/SelectAddress';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import { useAuth } from '~/hooks';
import { FORM_ACTION } from '~/utils/enum';
import ValidationRegex from '~/utils/validationRegex';
import { getSplitAddress } from '~/utils/format';
import {
  httpGetCustomerById,
  httpEditCustomer,
  httpPostCustomer,
} from '~/apiServices/customerServices';
import { useNavigate } from 'react-router-dom';

const cx = className.bind(styles);

const Customerinfo = ({ customerId, action }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const initValue = {
    id: '',
    name: '',
    phone: '',
    address: '',
    provinceId: null,
    districtId: null,
    accountUsername: auth?.username ? auth.username : '',
  };
  const [customer, setCustomer] = useState(initValue);
  const [input, setInput] = useState(customer);
  const [address, setAddress] = useState(() => {
    return {
      provinceId: Number.parseInt(customer.provinceId),
      districtId: Number.parseInt(customer.districtId),
    };
  });

  useEffect(() => {
    const getCustomerInfo = async () => {
      if (action === FORM_ACTION.EDIT) {
        const res = await httpGetCustomerById(customerId);
        if (res.data) {
          setCustomer(res.data);
          setInput({
            ...res.data,
            address: getSplitAddress(res.data.address).streetName,
          });
          setAddress({
            provinceId: res.data.provinceId,
            districtId: res.data.districtId,
          });
        }
      } else setCustomer({ ...customer, provinceId: -1 });
    };
    getCustomerInfo();
  }, []);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSave = async (e, formValidated, setSubmitting) => {
    e.preventDefault();
    if (!formValidated) {
      return;
    }
    let fullAddress = customer.address;
    const splitAddress = getSplitAddress(customer.address);
    if (address.districtId !== customer.districtId) {
      fullAddress = `${input.address}, ${address.districtName}, ${address.provinceName}`;
    } else {
      fullAddress = splitAddress.districtName
        ? `${input.address}, ${splitAddress.districtName}, ${splitAddress.provinceName}`
        : `${input.address}, ${splitAddress.provinceName}`;
    }
    const updatedCustomer = {
      ...input,
      districtId: address.districtId,
      provinceId: address.provinceId,
      address: fullAddress.toLowerCase(),
    };
    try {
      setSubmitting(true);
      if (action === FORM_ACTION.EDIT) {
        await httpEditCustomer(customer.id, updatedCustomer);
      } else {
        await httpPostCustomer(updatedCustomer);
      }
      setSubmitting(false);
      toast.success('Lưu thông tin thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate(`/customer-info`, {
        state: { action: FORM_ACTION.VIEW },
      });
    } catch (error) {
      console.log(error);
    }
  };
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
  ];

  return (
    customer?.provinceId && (
      <div className={cx('user-infor')}>
        <h4>Người nhận</h4>
        <FormValidation>
          {({ formValidated, setValidated, setSubmitting }) => {
            return (
              <form>
                {formInputs.map((formInput) => (
                  <FormInput
                    key={formInput.id}
                    value={input[formInput.name]}
                    onChange={handleChange}
                    setValidated={setValidated}
                    {...formInput}
                  />
                ))}
                <div className={cx('form-control')}>
                  <h4>Huyện/Tỉnh (TP) </h4>
                  <SelectAddress
                    address={{
                      provinceId:
                        customer?.provinceId || input?.provinceId || '',
                      districtId:
                        customer?.districtId || input?.districtId || '',
                    }}
                    setAddress={setAddress}
                  />
                </div>
                <FormInput
                  key='3'
                  name='address'
                  value={input.address}
                  onChange={handleChange}
                  setValidated={setValidated}
                  type='text'
                  placeholder='Số nhà/Tên đường'
                  required={true}
                />
                <div className={cx('form-control')}>
                  <input
                    name='fullAddress'
                    value={customer.address}
                    type='text'
                    placeholder='Địa chỉ chi tiết'
                    readOnly={true}
                  />
                </div>
                <Clickable
                  outline
                  text='Lưu'
                  onClick={(e) => handleSave(e, formValidated, setSubmitting)}
                />
              </form>
            );
          }}
        </FormValidation>
      </div>
    )
  );
};

export default Customerinfo;
