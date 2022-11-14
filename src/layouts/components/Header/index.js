import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames/bind'
import { Icon } from '@iconify/react'
import styles from './Header.module.scss'
import NavLink from '../NavLink'
import Search from '../Search'
import logo from '~/assets/images/logo.png'

const cx = className.bind(styles)
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div>
      <header className={cx('wrapper')}>
        <div>
          <ul className={cx('top-nav')}>
            <li>
              <Link to="stores">
                <Icon icon="bx:map" className={cx('icon')} />
                <span>154 cửa hàng trên cả nước</span>
              </Link>
            </li>
            <li>
              <Link to="stores">
                <Icon icon="bx:phone-call" className={cx('icon')} />
                <span>Đặt hàng: 180018545</span>
              </Link>
            </li>
            <li>
              <Link to="stores">
                <Icon icon="bx:smile" className={cx('icon')} />
                <span>Freeship từ đơn 50K</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav className={cx('nav-bar', 'container')}>
          <div className={cx('logo')}>
            <Link to="/">
              <img src={logo} alt="Gigo" />
            </Link>
          </div>
          <NavLink />
          <div className={cx('left')}>
            <div className={cx('icon')}>
              {!searchOpen && (
                <Icon
                  icon="bx:search-alt-2"
                  onClick={() => setSearchOpen(true)}
                />
              )}
              {searchOpen && (
                <Icon
                  icon="fa-solid:times"
                  onClick={() => setSearchOpen(false)}
                />
              )}
            </div>
            <div className={cx('icon')}>
              <Icon icon="bx:user" />
            </div>
            <div className={cx('icon', 'cart')}>
              <Icon icon="bx:cart-alt" />
              <span>2</span>
            </div>
          </div>
        </nav>
        {searchOpen && <Search isOpen={searchOpen} />}
      </header>
    </div>
  )
}

export default Header
