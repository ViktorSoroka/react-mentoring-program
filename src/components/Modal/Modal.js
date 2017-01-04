import React, { Component } from 'react';

import './Modal.css';


export default class Modal extends Component {
  onClose() {

  }

  onOpen() {

  }

  render() {
    return (
      <div className="modal">
        <h1>{title}</h1>
        {children}
      </div>);
  }
};
