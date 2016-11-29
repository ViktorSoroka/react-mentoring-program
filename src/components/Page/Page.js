import React from 'react';

import './Page.css';


export default ({ header, asideContent, mainContent }) => {
  return (
    <div className="todo">
      <header className="todo-header">{header}</header>
      <div className="todo-content">
        <div className="todo__row">
          <aside className="todo__aside">{asideContent}</aside>
          <main className="todo__main">{mainContent}</main>
        </div>
      </div>
    </div>
  );
};
