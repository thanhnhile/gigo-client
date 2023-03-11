import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './AccountSetting.module.scss';
import Clickable from '~/components/Clickable';
import { useAuth } from '~/hooks';

const cx = className.bind(styles);

const AccountSetting = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [toggleInput, setToggleInput] = useState(true);
  const [input, setInput] = useState({});
  const fullNameRef = useRef();
  const phoneRef = useRef();
  const handleToggle = () => {
    setToggleInput(!toggleInput);
    fullNameRef.current.focus();
  };
  const handleLogout = () => {
    setAuth({});
    navigate('/');
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {};
  return (
    <div className={cx('user-infor')}>
      <h4>Thông tin tài khoản</h4>
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
      <Clickable outline text='Lưu' onClick={handleSave} />
      <Icon onClick={handleToggle} className={cx('icon')} icon='mdi:pencil' />
      <div className={cx('logout-btn')}>
        <Clickable text='Đăng xuất' primary onClick={handleLogout} />
      </div>
    </div>
  );
};

export default AccountSetting;
