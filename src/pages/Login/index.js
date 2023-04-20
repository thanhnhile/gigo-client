import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import className from 'classnames/bind';
import styles from './Login.module.scss';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import Clickable from '../../components/Clickable';
import useAuth from '~/hooks/useAuth';
import { httpAuth } from '../../apiServices/authServices';
import { httpGetEmployeeAccountUsername } from '~/apiServices/employeeServices';
import { ROLE } from '~/utils/enum';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);
const initValue = { username: '', password: '' };

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [user, setUser] = useState(initValue);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
      pattern: ValidationRegex.password.pattern,
      message: ValidationRegex.password.message,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng nhập</h1>
      <p>
        Chưa có tài khoản?
        <span onClick={() => navigate('/register')}>Đăng ký</span>
      </p>
      <FormValidation>
        {({ formValidated, setValidated, setSubmitting }) => {
          const handleSubmit = async (e) => {
            e.preventDefault();
            if (!formValidated) {
              return;
            }
            setSubmitting(true);
            const response = await httpAuth(user);
            if (response.errMsg) {
              toast.error('Sai tài khoản hoặc mật khẩu', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
              });
              setSubmitting(false);
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
            setSubmitting(false);
            setUser(initValue);
            navigate('/');
          };
          return (
            <form
              onSubmit={(e) => handleSubmit(e, formValidated, setSubmitting)}
              className={cx('form')}
            >
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
          );
        }}
      </FormValidation>
    </div>
  );
}

export default Login;
