import React from 'react';

import './Header.css';


const Header = ({ title, children }) => {
  return <header className="todo-header">
    <h1>{title}</h1>
    {children}
  </header>;
};

export default Header;
