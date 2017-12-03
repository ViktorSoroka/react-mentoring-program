import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';


export default function Header({ title, children }) {
  return (
    <header className="todo-header">
      <h1>{title}</h1>
      {children}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};
