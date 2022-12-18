import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from '../Sidebar/Sidebar.module.scss';

const cx = className.bind(styles);

const AdminMenu = () => {
  const MENU_ITEM = [
    {
      title: 'Sản phẩm',
      to: '/admin/products',
      icon: <Icon icon='ic:outline-shopping-bag' />,
    },
    {
      title: 'Phân loại',
      to: '/admin/categories',
      icon: <Icon icon='tabler:category' />,
    },
    {
      title: 'Đơn hàng',
      to: '/admin/orders',
      icon: <Icon icon='material-symbols:order-play-outline-rounded' />,
    },
    {
      title: 'Cửa hàng',
      to: '/admin/stores',
      icon: <Icon icon='ic:outline-store-mall-directory' />,
    },
    {
      title: 'Nhân viên',
      to: '/admin/employees',
      icon: <Icon icon='clarity:employee-group-line' />,
    },
  ];
  const location = useLocation();
  console.log(location.pathname);
  return MENU_ITEM.map((item, index) => {
    return (
      <li
        key={index}
        className={cx({ active: location.pathname.includes(item.to) })}
      >
        <Link to={item.to}>
          <span>{item.icon}</span>
          {item.title}
        </Link>
      </li>
    );
  });
};

export default AdminMenu;
