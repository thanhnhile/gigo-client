import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <header>
      <span>
        <Icon icon='mdi:bell-check' />
      </span>
      <Link to='/'>
        <Icon icon='material-symbols:logout' />
      </Link>
    </header>
  );
};

export default Header;
