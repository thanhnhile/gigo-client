import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './AccountSetting.module.scss';
import Clickable from '~/components/Clickable';
import { useAuth } from '~/hooks';
import { FORM_ACTION } from '~/utils/enum';

const cx = className.bind(styles);

const AccountSetting = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [toggleInput, setToggleInput] = useState(true);
  const [input, setInput] = useState({});
  const passWordRef = useRef();
  const confirmPassRef = useRef();
  const handleToggle = () => {
    setToggleInput(!toggleInput);
    passWordRef.current.focus();
  };
  const handleLogout = () => {
    setAuth({});
    navigate('/');
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleAddCustomerInfo = () => {
    navigate(`/customer-info`, {
      state: { action: FORM_ACTION.ADD },
    });
  };
  const handleViewListCustomerInfo = () => {
    navigate(`/customer-info`, {
      state: { action: FORM_ACTION.VIEW },
    });
  };
  const handleViewListProductLiked = () => {
    navigate(`/productsLiked-info`);
};
  const handleSave = (e) => {};
  return (
    <div className={cx('user-infor')}>
      <h4>Thông tin tài khoản</h4>
      <div className={cx('form-control')}>
        <input
          ref={passWordRef}
          value={input.password}
          onChange={handleChange}
          name='password'
          type='password'
          placeholder='Mật khẩu'
          readOnly={toggleInput}
        />
      </div>
      <div className={cx('form-control')}>
        <input
          ref={confirmPassRef}
          name='confirmPass'
          onChange={handleChange}
          value={input.confirmPass}
          type='password'
          placeholder='Xác nhận mật khẩu'
          readOnly={toggleInput}
        />
      </div>
      <Clickable outline text='Lưu' onClick={handleSave} />
      <h4>Sổ địa chỉ</h4>
      <div className={cx('form-control')}>
        <Icon
          onClick={handleAddCustomerInfo}
          className={cx('action-btn')}
          icon='material-symbols:add-circle-outline'
        />
        Thêm mới
      </div>
      <div className={cx('form-control')}>
        <Icon
          onClick={handleViewListCustomerInfo}
          className={cx('action-btn')}
          icon='material-symbols:list-alt-outline-rounded'
        />
        Xem tất cả
      </div>
      <h4>Sản phẩm yêu thích</h4>
      <div className={cx('form-control')}>
        <Icon
          onClick={handleViewListProductLiked}
          className={cx('action-btn')}
          icon='ph:heart'
        />
        Xem danh sách
      </div>
      <Icon onClick={handleToggle} className={cx('icon')} icon='mdi:pencil' />
      <div className={cx('logout-btn')}>
        <Clickable text='Đăng xuất' primary onClick={handleLogout} />
      </div>
    </div>
  );
};

export default AccountSetting;
