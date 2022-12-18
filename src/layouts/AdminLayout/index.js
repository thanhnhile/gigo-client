import React from 'react';
import className from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Sidebar from '../components/Sidebar';
import Header from '../components/AdminHeader';
const cx = className.bind(styles);

const AdminLayout = ({ children }) => {
  return (
    <div className={cx('fluid-container', 'wrapper')}>
      <Sidebar />
      <div className={cx('content')}>
        <div className={cx('header')}>
          {' '}
          <Header />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
