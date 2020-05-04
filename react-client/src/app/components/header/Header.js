import { default as React } from 'react';
import Navigation from './Navigation';

import './Header.scss';

const Header = ({children}) => {
  return (
    <header className="page-header">
      <Navigation />
    </header>
  );
};

export default Header;