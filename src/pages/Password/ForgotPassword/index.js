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
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  
  const formInputs = [
    {
      id: 1,
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      required: true,
      pattern: ValidationRegex.email.pattern,
      message: ValidationRegex.email.message,
    },
  ];
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validated) {
      return;
    }
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
    setEmail('');
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
      <form  onSubmit={handleSubmit} className={cx('form')}>
            {formInputs.map((formInput) => (
              <FormInput
                key={formInput.id}
                value={email[formInput.name]}
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
              Quay lai trang chủ
            </a>
            <Clickable text='Gửi' primary />
          </form>
    </div>
  );
}
export default ForgotPassword;
