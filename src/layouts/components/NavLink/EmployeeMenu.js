import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from '../Sidebar/Sidebar.module.scss';

const cx = className.bind(styles);

const EmployeeMenu = () => {
  const MENU_ITEM = [
    {
      title: 'Chờ xử lý',
      to: '/employee',
      icon: <Icon icon='ri:dashboard-3-line' />,
    },
    {
      title: 'Đơn hàng',
      to: '/employee/orders',
      icon: <Icon icon='material-symbols:order-play-outline-rounded' />,
    },
  ];
  const location = useLocation().pathname.split('/').pop();
  return MENU_ITEM.map((item, index) => {
    return (
      <li
        key={index}
        className={cx({ active: item.to.split('/').pop().includes(location) })}
      >
        <Link to={item.to}>
          <span>{item.icon}</span>
          {item.title}
        </Link>
      </li>
    );
  });
};

export default EmployeeMenu;
