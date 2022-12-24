import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Sidebar from '../components/Sidebar';
import Header from '../components/AdminHeader';
const cx = className.bind(styles);

const AdminLayout = ({ children }) => {
  const [isOpen,setOpen] = useState(false);
  return (
    <div className={cx('fluid-container', 'wrapper')}>
      <Sidebar />
      <div className={cx('content')}>
        <div className={cx('header')}>
          {' '}
          <Header setOpen={setOpen}/>
          <div className={cx('announcement', { open: isOpen })}>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>

            <p>h1 nhi da mu gi do</p>
            <p>h1 nhi da mu gi do</p>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
