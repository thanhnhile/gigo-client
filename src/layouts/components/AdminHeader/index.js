import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <Icon icon='clarity:home-line' />
      </Link>
    </header>
  );
};

export default Header;
