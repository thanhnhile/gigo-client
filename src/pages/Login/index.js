import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import FormInput from '~/components/Form/FormInput';
import Clickable from '../../components/Clickable';
import useAuth from '~/hooks/useAuth';
import { httpAuth } from '../../apiServices/authServices';
import { httpGetEmployeeAccountUsername } from '~/apiServices/employeeServices';
import { ROLE } from '~/utils/enum';
import { toast } from 'react-toastify';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);
const initValue = { username: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState(initValue);
  const [validated, setValidated] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validated) {
      return;
    }
    const response = await httpAuth(user);
    if (response.errMsg) {
      toast.error('Sai tài khoản hoặc mật khẩu', {
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
  const formInputs = [
    {
      id: 1,
      type: 'text',
      name: 'username',
      placeholder: 'Số điện thoại',
      required: true,
      pattern: ValidationRegex.phone.pattern,
      message: ValidationRegex.phone.message,
    },
    {
      id: 2,
      type: 'password',
      name: 'password',
      placeholder: 'Mật khẩu',
      required: true,
      // pattern: ValidationRegex.password.pattern,
      // message: ValidationRegex.password.message,
    },
  ];
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng nhập</h1>
      <p>
        Chưa có tài khoản?
        <span onClick={() => navigate('/register')}>Đăng ký</span>
      </p>
      <form onSubmit={handleSubmit} className={cx('form')}>
        {formInputs.map((formInput) => (
          <FormInput
            key={formInput.id}
            value={user[formInput.name]}
            onChange={handleChange}
            setValidated={setValidated}
            {...formInput}
          />
        ))}
        <Link to='/forgotPassword'>Quên mật khẩu?</Link>
        <Clickable text='Đăng nhập' primary />
      </form>
    </div>
  );
}

{
  /* <input
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
        /> */
}

export default Login;
