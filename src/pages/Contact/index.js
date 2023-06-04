import React, { useState } from 'react';
import className from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './Contact.module.scss';
import Clickable from '~/components/Clickable';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import ValidationRegex from '~/utils/validationRegex';
import { httpSendFeedback } from '~/apiServices/sendFeedbackServices';

const initValue = {
  fullname: '',
  email: '',
  content: '',
};
const cx = className.bind(styles);
const Contact = () => {
  const [feedback, setFeedBack] = useState(initValue);
  const handleSubmit = async (e, formValidated) => {
    e.preventDefault();
    console.log(formValidated);
    if (!formValidated) {
      return;
    }
    console.log(feedback);
    const res = await httpSendFeedback(feedback);
    if (res.errMsg) {
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    toast.success('Cảm ơn bạn đã gửi feedback!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
    setFeedBack(initValue);
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
                name='content'
                value={feedback.content}
                placeholder='Hãy gửi feedback cho chúng tôi (tối thiểu 200 ký tự)'
                minLength={200}
                onChange={handleChange}
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
