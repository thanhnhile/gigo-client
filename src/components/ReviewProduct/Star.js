import React from 'react';
import { Icon } from '@iconify/react';
import classNames from 'classnames/bind';
import styles from './ReviewProduct.module.scss';

const cx = classNames.bind(styles);

const Star = ({ isActive }) => {
  return (
    <Icon
      icon='material-symbols:star'
      className={cx('star', { 'active': isActive })}
    />
  );
};

export default Star;
