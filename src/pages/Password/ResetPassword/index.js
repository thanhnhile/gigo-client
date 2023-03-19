import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import className from 'classnames/bind';
import Clickable from '~/components/Clickable';
import FormInput from '~/components/Form/FormInput';
import styles from '../Password.module.scss';
import { toast } from 'react-toastify';
import { httpResetPassword } from '../../../apiServices/accountServices';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);
const initValue = { password: '' };

function ResetPassword() {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();
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
    const newUser = {
      password: user.password,
    };
    const response = await httpResetPassword(token, newUser);
    if (response.errMsg) {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setUser(initValue);
    toast.success('Cập nhật thành công', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };
  const formInputs = [
    {
      id: 1,
      type: 'password',
      name: 'password',
      placeholder: 'Mật khẩu',
      required: true,
      pattern: ValidationRegex.password.pattern,
      message: ValidationRegex.password.message,
    },
    {
      id: 2,
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Nhập lại mật khẩu',
      required: true,
      pattern: (value) => value === user.password,
      message: 'Mật khẩu không trùng khớp',
    },
  ];

  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đặt lại mật khẩu</h1>
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
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          href='/'
        >
          Quay lại trang chủ
        </a>
        <Clickable text='Cập nhật' primary />
      </form>
    </div>
  );
}

export default ResetPassword;
