import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import Clickable from '../../components/Clickable';
import useAuth from '~/hooks/useAuth';
import { httpAuth } from '../../apiServices/authServices';
import { httpGetEmployeeAccountUsername } from '~/apiServices/employeeServices';
import { ROLE } from '~/utils/enum';
import { toast } from 'react-toastify';

const cx = className.bind(styles);
const initValue = { username: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState(initValue);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await httpAuth(user);
    console.log(response);
    if (response.errMsg) {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const username = response.data.username;
    const accessToken = response.data.accessToken;
    const roles = response.data.roles.map((role) => role.authority);
    if (roles.includes(ROLE['EMPLOYEE'])) {
      const res = await httpGetEmployeeAccountUsername(username);
      if (response.data) {
        const employeeInfo = {
          employeeId: res.data.id,
          storeId: res.data?.store?.id,
        };
        setAuth({ username, accessToken, roles, employeeInfo });
      }
    } else {
      setAuth({ username, accessToken, roles });
    }
    setUser(initValue);
    navigate('/');
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng nhập</h1>
      <p>
        Chưa có tài khoản?
        <span onClick={() => navigate('/register')}>Đăng ký</span>
      </p>
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
