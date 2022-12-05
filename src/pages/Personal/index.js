import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import Clickable from '~/components/Clickable';
import className from 'classnames/bind';
import styles from './Personal.module.scss';

const cx = className.bind(styles);

const Personal = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleClick = () => {
    setAuth({});
    navigate('/');
  };
  return (
    <div className={cx('container')}>
      Hello {auth.username}
      <Clickable primary text='Đăng xuất' onClick={handleClick} />
    </div>
  );
};

export default Personal;
