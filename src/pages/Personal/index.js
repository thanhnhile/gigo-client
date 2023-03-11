/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './Personal.module.scss';
import { useAuth } from '~/hooks';
import HistoryOrder from '../../components/Personal/HistoryOrder';
import AccountSetting from '../../components/Personal/AccountSetting';

const cx = className.bind(styles);

const Personal = () => {
  const [isLoading, setLoading] = useState(false);
  const { auth } = useAuth();
  if (isLoading) return 'Loading....';
  return (
    <div className={cx('container')}>
      {isLoading ? (
        <h1>Đang tải....</h1>
      ) : (
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
      )}
    </div>
  );
};

export default Personal;
