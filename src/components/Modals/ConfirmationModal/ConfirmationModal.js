import React, { PropTypes } from 'react';

import withModal from '../../../helpers/withModal';

import '../Modal.css';

class ConfirmationModal extends React.Component {
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

//Todo: check types
ConfirmationModal.propTypes = {
  isVisible : PropTypes.bool,
  modalTitle: PropTypes.string,
  onConfirm : PropTypes.func,
  onCancel  : PropTypes.func,
  data      : PropTypes.object
};

export default withModal(ConfirmationModal);
