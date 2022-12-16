import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Register.module.scss';
import Clickable from '../../components/Clickable';
import { httpRegister } from '~/apiServices/authServices';
import { phoneValidation } from '~/utils/validation';

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
      setError('Số điện thoại không hợp lệ!');
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError('Mật khẩu không trùng khớp!');
      return;
    }
    // if (!passwordValidation(user.password)) {
    //   setError('Mật khẩu không hợp lệ');
    //   return;
    // }
    const newUser = {
      username: user.username,
      password: user.password,
    };
    const response = await httpRegister(newUser);
    if (response.errMsg) {
      setError(response.errMsg);
      return;
    }
    setError('');
    setUser(initValue);
    console.log(response);
    response.errMsg && navigate('/auth');
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
