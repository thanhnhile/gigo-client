import React from 'react';
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <header>
      <span>
        <Icon icon='mdi:bell-check' />
      </span>
      <span>
        <Icon icon='material-symbols:logout' />
      </span>
    </header>
  );
};

export default Header;
