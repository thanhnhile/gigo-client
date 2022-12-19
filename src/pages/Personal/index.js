import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import Clickable from '~/components/Clickable';
import className from 'classnames/bind';
import styles from './Personal.module.scss';
import { Icon } from '@iconify/react';
import SelectAddress from '~/components/SelectAddress';
import { httpGetCustomerInfoByUsername } from '~/apiServices/userServices';
import { httpEditCustomer } from '~/apiServices/customerServices';
import { httpGetOrderByAccountUsername } from '~/apiServices/orderServices';
import ListOrder from '~/components/Order/ListOrder/ListOrder';

const cx = className.bind(styles);

const Personal = () => {
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
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState(() => {
    return { provinceId: customer.provinceId, districtId: customer.districtId };
  });
  const [toggleInput, setToggleInput] = useState(true);
  const [error, setError] = useState('');
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await httpGetCustomerInfoByUsername(auth.username);
      console.log(res);
      if (res.data) {
        setCustomer(res.data);
      }
    };
    const getHistoryOrders = async () => {
      const res = await httpGetOrderByAccountUsername(auth.username);
      console.log(res);
      if (res.data) {
        setOrders(res.data);
      }
    };
    getCustomerInfo();
    getHistoryOrders();
  }, []);
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    const updatedCustomer = { ...customer, ...address };
    console.log(updatedCustomer);
    if (
      updatedCustomer.name === '' ||
      updatedCustomer.phoneNumber === '' ||
      updatedCustomer.address === '' ||
      updatedCustomer.provinceId === '' ||
      updatedCustomer.districtId === ''
    ) {
      setError('Trường không hợp lệ');
      return;
    }
    try {
      const res = await httpEditCustomer(updatedCustomer.id, updatedCustomer);
      setCustomer(res.data);
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
    <div className={cx('container')}>
      <h1>Xin chào {auth.username} </h1>
      <div className={cx('wrapper')}>
        <div className={cx('user-infor')}>
          {error && <p className={cx('error')}>{error}</p>}
          <h4>Thông tin cá nhân</h4>
          <div className={cx('form-control')}>
            <input
              ref={fullNameRef}
              value={customer.name}
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
              value={customer.phone}
              type='phone'
              placeholder='Số điện thoại'
              readOnly={toggleInput}
            />
          </div>
          <div className={cx('form-control')}>
            <h4>Địa chỉ</h4>
            <SelectAddress address={address} setAddress={setAddress} />
          </div>
          <div className={cx('form-control')}>
            <input
              ref={addressRef}
              name='address'
              onChange={handleChange}
              value={customer.address}
              type='text'
              placeholder='Địa chỉ chi tiết'
              readOnly={toggleInput}
            />
          </div>
          <Clickable outline text='Lưu' onClick={handleSave} />
          <Icon onClick={toggle} className={cx('icon')} icon='mdi:pencil' />
          <div className={cx('logout-btn')}>
            <Clickable text='Đăng xuất' primary onClick={handleLogout} />
          </div>
        </div>
        <div className={cx('order-info')}>
          <h4>Lịch sử đơn hàng</h4>
          <ListOrder orders={orders} />
        </div>
      </div>
    </div>
  );
};

export default Personal;
