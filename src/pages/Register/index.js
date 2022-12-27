import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Register.module.scss';
import Clickable from '../../components/Clickable';
import { httpRegister } from '~/apiServices/authServices';
import { phoneValidation } from '~/utils/validation';
import { toast } from 'react-toastify';

const cx = className.bind(styles);
const initValue = { username: '', password: '' };

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState(initValue);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneValidation(user.username)) {
      toast.error('Số điện thoại không hợp lệ!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    if (user.password !== user.confirmPassword) {
      toast.error('Mật khẩu không trùng khớp!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const newUser = {
      username: user.username,
      password: user.password,
    };
    const response = await httpRegister(newUser);
    if (response.errMsg) {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setError('');
    setUser(initValue);
    console.log(response);
    toast.success('Tạo tài khoản thành công', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng ký</h1>
      <p>
        Đã có tài khoản?<span onClick={() => navigate('/auth')}>Đăng nhập</span>
      </p>
      <p className={cx('error', { show: error })}>{error}</p>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          name='username'
          onChange={handleChange}
          type='phone'
          placeholder='Số điện thoại'
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Mật khẩu'
        />
        <input
          name='confirmPassword'
          onChange={handleChange}
          type='password'
          placeholder='Nhập lại mật khẩu'
        />
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          href='/'
        >
          Quay lai trang chủ
        </a>
        <Clickable text='Đăng ký' primary />
      </form>
    </div>
  );
}

export default Register;
