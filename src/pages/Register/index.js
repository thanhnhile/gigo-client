import React from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Register.module.scss';
import Clickable from '../../components/Clickable';

const cx = className.bind(styles);

function Register() {
  const navigate = useNavigate();
  return (
    <div className={cx('container', 'wrapper')}>
      <h2>Đăng ký</h2>
      <p>
        Đã có tài khoản?<span onClick={() => navigate('/auth')}>Đăng nhập</span>
      </p>
      <form className={cx('form')}>
        <input type='text' placeholder='Họ và tên' />
        <input type='phone' placeholder='Số điện thoại' />
        <input type='password' placeholder='Mật khẩu' />
        <input type='password' placeholder='Nhập lại mật khẩu' />
        <a href='/'>Quay lai trang chủ</a>
        <Clickable text='Đăng ký' primary />
      </form>
    </div>
  );
}

export default Register;
