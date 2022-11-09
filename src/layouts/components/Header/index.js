import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Header.module.scss';
import NavLink from '../NavLink';
import Search from '../Search2';


const cx = className.bind(styles);
const Header = () => {
    const [search, setSearch] = useState(false);
    return (
        <React.Fragment>
            <header className={cx('wrapper')}>
                <div >
                    <ul className={cx('top-nav')}>
                        <li>
                            <Link to='stores'>
                                <Icon icon="bx:map" className={cx('icon')} />
                                <span>154 cửa hàng trên cả nước</span>
                            </Link>
                            <Link to='stores'>
                                <Icon icon="bx:phone-call" className={cx('icon')} />
                                <span>Đặt hàng: 180018545</span>
                            </Link>
                            <Link to='stores'>
                                <Icon icon="bx:smile" className={cx('icon')} />
                                <span>Freeship từ đơn 50K</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <nav className={cx('nav-bar', 'container')}>
                    <div className={cx('logo')}>
                        <img src='https://www.foody.vn/style/images/logo/foody-vn.png' alt='Gigo' />
                    </div>
                    <NavLink />
                    <div className={cx('left')}>
                        <div className={cx('icon')}>
                            {!search && <Icon icon="bx:search-alt-2" onClick={() => setSearch(true)} />}
                            {search && <Icon icon="fa-solid:times" onClick={() => setSearch(false)} />}
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
            </header >
            {search && <Search />}
        </React.Fragment>
    )
}

export default Header;