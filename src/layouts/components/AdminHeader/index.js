import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
// import className from 'classnames/bind';
// import styles from '../../AdminLayout/AdminLayout.module.scss';

// const cx = className.bind(styles);

const Header = ({ setOpen }) => {
  return (
    <header>
      <span className='bell'>
        <Icon icon='mdi:bell-check' onClick={() => setOpen((prev) => !prev)} />
      </span>
      <Link to='/'>
        <Icon icon='material-symbols:logout' />
      </Link>
    </header>
  );
};

export default Header;
