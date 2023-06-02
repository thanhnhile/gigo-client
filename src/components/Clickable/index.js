import React from 'react';
import className from 'classnames/bind';
import styles from './Clickable.module.scss';

const cx = className.bind(styles);

const Clickable = (props) => {
  const { onClick, text, primary, second, outline, disable, noMargin, icon } =
    props;
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={cx(
        'btn',
        { primary: primary },
        { second: second },
        { outline: outline },
        { disable: disable },
        { noMargin: noMargin }
      )}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default Clickable;
