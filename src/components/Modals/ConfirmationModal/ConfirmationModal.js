import React from 'react';

import withModal from '../../../helpers/withModal';

import '../Modal.css';

class ModalLayout extends React.Component {
  render() {
    const {
            isVisible,
            modalTitle,
            onConfirm,
            onCancel
          } = this.props;

    return isVisible ? (
        <section className="skylight-wrapper">
          <div className="modal-overlay"></div>
          <div className="modal-dialog">
            <h2 className="modal-title">{modalTitle}</h2>
            <div className="modal-btn-wrap">
              <button className="modal-btn"
                      onClick={onConfirm}>Confirm</button>
              <button className="modal-btn"
                      onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </section>
      ) : <div />;
  }
}

export default withModal(ModalLayout);
