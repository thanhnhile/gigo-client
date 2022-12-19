import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const MENU_ITEM = [
    {
      title: 'Cửa hàng',
      to: '/stores',
    },
    {
      title: 'Menu',
      to: '/menu/all',
    },
    {
      title: 'Giới thiệu',
      to: '/about',
    },
    {
      title: 'Liên hệ',
      to: '/contact',
    },
    {
      title: 'Tuyển dụng',
      to: '/news',
    },
  ];
  return MENU_ITEM.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.to}>{item.title}</Link>
      </li>
    );
  });
};

export default Menu;
