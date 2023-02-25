import React from 'react';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Modal.module.scss';
import Clickable from '../Clickable';

const cx = classNames.bind(styles);

const Modal = ({
  children,
  footer,
  title,
  size,
  handleCancel,
  handleClick,
  ...props
}) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('blur')}></div>
      <div className={cx('modal', size)}>
        <div className={cx('header')}>
          <h3>{title}</h3>
          <Icon
            onClick={handleCancel}
            icon='humbleicons:times-circle'
            className={cx('icon')}
          />
        </div>
        <div className={cx('body')}>{children}</div>
        <div className={cx('footer')}>
          {footer ?? <Clickable outline onClick={handleCancel} text='Đóng' />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
