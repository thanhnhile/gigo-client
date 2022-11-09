import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './NavLink.module.scss';

const cx = className.bind(styles);

const NavLink = () => {
    const MENU_ITEM = [
        {
            title: 'Cửa hàng',
            to: '/store'
        },
        {
            title: 'Menu',
            to: '/menu'
        },
        {
            title: 'Giới thiệu',
            to: '/about'
        },
        {
            title: 'Liên hệ',
            to: '/contact'
        }
    ]
    return (
        <ul className={cx('nav-links')}>
            {
                MENU_ITEM.map((item, index) => {
                    return <li key={index}>
                        <Link to={item.to}>{item.title}</Link>
                    </li>
                })
            }
        </ul>
    )
}

export default NavLink