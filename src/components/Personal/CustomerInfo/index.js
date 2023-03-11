/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './CustomerInfo.module.scss';
import Clickable from '~/components/Clickable';
import SelectAddress from '~/components/SelectAddress';
import {
  httpGetCustomerById,
  httpEditCustomer,
  httpPostCustomer,
} from '~/apiServices/customerServices';

const cx = className.bind(styles);

const getSplitAddress = (fullAddress) => {
  const indexDistrictStart = fullAddress.includes('huyện')
    ? fullAddress.indexOf('huyện')
    : fullAddress.includes('quận')
    ? fullAddress.indexOf('quận')
    : fullAddress.indexOf('thành phố');
  const indexProvinceStart = fullAddress.includes('tỉnh')
    ? fullAddress.indexOf('tỉnh')
    : fullAddress.indexOf('thành phố');
  const streetName = fullAddress.slice(0, indexDistrictStart - 2);
  const districtName = fullAddress.slice(
    indexDistrictStart,
    indexProvinceStart - 2
  );
  const provinceName = fullAddress.slice(indexProvinceStart);
  return { streetName, districtName, provinceName };
};

const Customerinfo = ({ customerId }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    phone: '',
    address: '',
    provinceId: '',
    districtId: '',
    accountUsername: auth?.username ? auth.username : '',
  });
  const [input, setInput] = useState(customer);
  const [address, setAddress] = useState(() => {
    return {
      provinceId: Number.parseInt(customer.provinceId),
      districtId: Number.parseInt(customer.districtId),
    };
  });
  const [toggleInput, setToggleInput] = useState(true);
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const getCustomerInfo = async () => {
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
      } else setCustomer({ ...customer, provinceId: -1 });
    };
    getCustomerInfo();
  }, []);
  const handleChange = (e) => {
    setInput({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    console.log(input);
    let fullAddress = customer.address;

    const splitAddress = getSplitAddress(customer.address);
    console.log('SPIT ', splitAddress);
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
      address: fullAddress,
    };
    console.log(updatedCustomer);
    if (
      updatedCustomer.name === '' ||
      updatedCustomer.phoneNumber === '' ||
      updatedCustomer.address === '' ||
      updatedCustomer.provinceId === '' ||
      updatedCustomer.districtId === ''
    ) {
      toast.error('Các trường là bắt buộc', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    }
    try {
      let res = {};
      if (customer.id) {
        res = await httpEditCustomer(customer.id, updatedCustomer);
        console.log(res.data);
      } else {
        res = await httpPostCustomer(updatedCustomer);
        console.log(res.data);
      }
      toast.success('Lưu thông tin thành công!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setCustomer(res.data);
      setInput({
        ...res.data,
        address: splitAddress(res.data.address).streetName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    setAuth({});
    navigate('/');
  };
  const toggle = () => {
    setToggleInput(!toggleInput);
    fullNameRef.current.focus();
  };

  return (
    customer?.provinceId && (
      <div className={cx('user-infor')}>
        <h4>Người nhận</h4>
        <div className={cx('form-control')}>
          <input
            ref={fullNameRef}
            value={input.name}
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Họ và tên'
            readOnly={toggleInput}
          />
        </div>
        <div className={cx('form-control')}>
          <input
            ref={phoneRef}
            name='phone'
            onChange={handleChange}
            value={input.phone}
            type='phone'
            placeholder='Số điện thoại'
            readOnly={toggleInput}
          />
        </div>
        <div className={cx('form-control')}>
          <h4>Huyện/Tỉnh (TP) </h4>
          <SelectAddress
            address={{
              provinceId: input.provinceId,
              districtId: input.districtId,
            }}
            setAddress={setAddress}
          />
        </div>
        <div className={cx('form-control')}>
          <input
            ref={addressRef}
            name='address'
            onChange={handleChange}
            value={input.address}
            type='text'
            placeholder='Số nhà/Tên đường'
            readOnly={toggleInput}
          />
        </div>
        <div className={cx('form-control')}>
          <input
            name='fullAddress'
            value={customer.address}
            type='text'
            placeholder='Địa chỉ chi tiết'
            readOnly={true}
          />
        </div>
        <Clickable outline text='Lưu' onClick={handleSave} />
        <Icon onClick={toggle} className={cx('icon')} icon='mdi:pencil' />
        <div className={cx('logout-btn')}>
          <Clickable text='Đăng xuất' primary onClick={handleLogout} />
        </div>
      </div>
    )
  );
};

export default Customerinfo;
