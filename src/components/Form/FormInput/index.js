import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

const FormInput = ({
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
      setOnError(e.target.value === '');
    }
    if (pattern) {
      if (typeof pattern === 'function') {
        setOnError(!pattern(e.target.value));
      } else setOnError(!pattern.test(e.target.value));
    }
  };
  const handleOnBlur = (e) => {
    setValidated((prev) => ({ ...prev, [e.target.name]: !onError }));
  };
  useEffect(() => {
    setValidated((prev) => ({ ...prev, [inputProps.name]: false }));
  }, []);
  return (
    <div className={cx('form-control')}>
      <input
        {...inputProps}
        onChange={onChange}
        onInput={handleFocus}
        onBlur={handleOnBlur}
        placeholder={required ? `${placeholder}*` : `${placeholder}`}
      />
      <span className={cx('error-message', { 'on-error': onError })}>
        {message ?? (required && 'Trường này là bắt buộc')}
      </span>
    </div>
  );
};

export default FormInput;
