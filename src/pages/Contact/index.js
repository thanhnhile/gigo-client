import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './Contact.module.scss';
import Clickable from '~/components/Clickable';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);
const Contact = () => {
  const [feedback, setFeedBack] = useState({
    fullName: '',
    email: '',
    content: '',
  });
  const handleSubmit = (e, formValidated) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setFeedBack((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const formInputs = [
    {
      id: 1,
      name: 'fullname',
      type: 'text',
      placeholder: 'Tên của bạn',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      required: true,
      pattern: ValidationRegex.email.pattern,
      message: ValidationRegex.email.message,
    },
  ];
  return (
    <div className={cx('min-container', 'wrapper')}>
      <div className={cx('header')}>
        <h2>LIÊN HỆ CHÚNG TÔI &nbsp;</h2>
      </div>
      <div className={cx('line')}></div>
      <div className={cx('body')}>
        <FormValidation>
          {({ setValidated, formValidated }) => (
            <form
              onSubmit={(e) => handleSubmit(e, formValidated)}
              className={cx('form')}
            >
              {formInputs.map((formInput) => (
                <FormInput
                  key={formInput.id}
                  value={feedback[formInput.name]}
                  onChange={handleChange}
                  setValidated={setValidated}
                  {...formInput}
                />
              ))}
              <textarea
                placeholder='Hãy gửi feedback cho chúng tôi*'
                required
              />
              <Clickable text='Gửi' primary />
            </form>
          )}
        </FormValidation>
      </div>
    </div>
  );
};

export default Contact;
