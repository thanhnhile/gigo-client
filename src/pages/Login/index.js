import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import Clickable from '../../components/Clickable';
import useAuth from '~/hooks/useAuth';
import { httpAuth } from '../../apiServices/authServices';

const cx = className.bind(styles);
const initValue = { username: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState(initValue);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await httpAuth(user);
    console.log(response);
    if (response.errMsg) {
      setError(response.errMsg);
      return;
    }
    const username = response.data.username;
    const accessToken = response.data.accessToken;
    const roles = response.data.roles.map((role) => role.authority);
    setAuth({ username, accessToken, roles });
    setUser(initValue);
    setError('');
    navigate('/');
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng nhập</h1>
      <p>
        Chưa có tài khoản?
        <span onClick={() => navigate('/register')}>Đăng ký</span>
      </p>
      {error && <p className={cx('error')}>{error}</p>}
      <form onSubmit={handleSubmit} className={cx('form')}>
        <input
          name='username'
          onChange={handleChange}
          type='text'
          placeholder='Số điện thoại'
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Mật khẩu'
        />
        <a href='reset'>Quên mật khẩu?</a>
        <Clickable text='Đăng nhập' primary />
      </form>
    </div>
  );
}

export default Login;
