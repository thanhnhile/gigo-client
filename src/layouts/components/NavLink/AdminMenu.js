import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from '../Sidebar/Sidebar.module.scss';

const cx = className.bind(styles);

const AdminMenu = () => {
  const MENU_ITEM = [
    {
      title: 'Thống kê',
      to: '/admin',
      icon: <Icon icon='ri:dashboard-3-line' />,
    },
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
      title: 'Cửa hàng',
      to: '/admin/stores',
      icon: <Icon icon='ic:outline-store-mall-directory' />,
    },
    {
      title: 'Nhân viên',
      to: '/admin/employees',
      icon: <Icon icon='clarity:employee-group-line' />,
    },
    ,
    {
      title: 'Mã giảm giá',
      to: '/admin/vouchers',
      icon: <Icon icon='mdi:voucher-outline' />,
    },
  ];
  const location = useLocation().pathname.split('/').pop();
  return MENU_ITEM.map((item, index) => {
    return (
      <li
        key={index}
        className={cx({
          active: item.to.split('/').pop().includes(location),
        })}
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
