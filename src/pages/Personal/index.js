/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Personal.module.scss';
import { useAuth } from '~/hooks';
import HistoryOrder from '../../components/Personal/HistoryOrder';
import AccountSetting from '../../components/Personal/AccountSetting';

const cx = className.bind(styles);

const Personal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { auth } = useAuth();
  return (
    <div className={cx('container')}>
      <>
        <h1>Xin chào {auth.username} </h1>
        <div className={cx('wrapper')}>
          {/* Account setting*/}
          <AccountSetting />
          {/* Account Setting*/}
          {/*History order */}
          <HistoryOrder />
          {/*History order */}
        </div>
      </>
    </div>
  );
};

export default Personal;
