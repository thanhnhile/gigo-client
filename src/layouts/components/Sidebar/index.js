import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import logo from '~/assets/images/logo.png';
import { AdminMenu, EmployeeMenu } from '../NavLink';
import { useAuth } from '~/hooks';

const cx = className.bind(styles);

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className={cx('wrapper')}>
      <div className={cx('logo')}>
        <Link to='/admin'>
          <img src={logo} alt='Gigo' />
        </Link>
      </div>
      <ul>
        {auth?.roles.includes('ADMIN') ? <AdminMenu /> : <EmployeeMenu />}
      </ul>
    </aside>
  );
};

export default Sidebar;
