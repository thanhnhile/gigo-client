import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '~/assets/images/logo.png';
import { AdminMenu } from '../NavLink';

const cx = className.bind(styles);

const Sidebar = () => {
  return (
    <aside className={cx('wrapper')}>
      <div className={cx('logo')}>
        <Link to='/'>
          <img src={logo} alt='Gigo' />
        </Link>
      </div>
      <ul>
        <AdminMenu />
      </ul>
    </aside>
  );
};

export default Sidebar;
