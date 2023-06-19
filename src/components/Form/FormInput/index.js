import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);
const FormInput = ({
  title,
  placeholder,
  onChange,
  message,
  pattern,
  required = false,
  setValidated,
  ...inputProps
}) => {
  const [onError, setOnError] = useState(false);
  const handleFocus = (e) => {
    if (required) {
      setOnError(!e.target.value.trim().length);
    }
  };
  const handleInput = (e) => {
    const value = e.target.value;
    if (required) {
      setOnError(!value.trim().length);
    }
    if (pattern) {
      if (typeof pattern === 'function') {
        setOnError(!pattern(value));
      } else setOnError(!pattern.test(value));
    }
  };
  const handleOnBlur = (e) => {
    setValidated((prev) => ({ ...prev, [e.target.name]: !onError }));
  };
  useEffect(() => {
    setValidated((prev) => ({ ...prev, [inputProps.name]: true }));
  }, []);
  return (
    <div className={cx('form-control')}>
      <label>{title}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
        placeholder={required ? `${placeholder}*` : `${placeholder}`}
        autoComplete='new-password'
        required={required}
      />
      <span className={cx('error-message', { 'on-error': onError })}>
        {message ?? (required && 'Trường này là bắt buộc')}
      </span>
    </div>
  );
};

export default FormInput;
