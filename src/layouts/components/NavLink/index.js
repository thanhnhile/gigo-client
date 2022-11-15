import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = () => {
  const MENU_ITEM = [
    {
      title: 'Cửa hàng',
      to: '/store',
    },
    {
      title: 'Menu',
      to: '/menu',
    },
    {
      title: 'Giới thiệu',
      to: '/about',
    },
    {
      title: 'Liên hệ',
      to: '/about',
    },
    {
      title: 'Tuyển dụng',
      to: '/contact',
    },
  ]
  return MENU_ITEM.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.to}>{item.title}</Link>
      </li>
    )
  })
}

export default NavLink
