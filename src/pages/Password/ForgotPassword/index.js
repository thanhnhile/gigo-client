import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import Clickable from '~/components/Clickable';
import FormInput from '~/components/Form/FormInput';
import styles from '../Password.module.scss';
import ValidationRegex from '~/utils/validationRegex';
import { toast } from 'react-toastify';
import { httpForgotPassword } from '../../../apiServices/accountServices';

const cx = className.bind(styles);

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!emailValidation(email)) {
    //   toast.error('Email không hợp lệ!', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 2000,
    //   });
    //   return;
    // }
    const newEmail = email;
    console.log(newEmail);
    const response = await httpForgotPassword(newEmail);
    console.log(response);
    if (response.errMsg) {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    setError('');
    console.log(response);
    toast.success('Gửi thành công', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Quên mật khẩu</h1>
      <p className={cx('error', { show: error })}>{error}</p>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <FormInput
          name='email'
          onChange={handleChange}
          type='email'
          placeholder='Email'
          required={true}
          pattern={ValidationRegex.email.pattern}
          message={ValidationRegex.email.message}
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
        <Clickable text='Gửi' primary />
      </form>
    </div>
  );
}
export default ForgotPassword;
