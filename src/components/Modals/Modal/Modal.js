import React, { PropTypes } from 'react';

import withModal from '../../../helpers/withModal';

import '../Modal.css';


class ModalLayout extends React.Component {
  render() {
    const {
            isVisible,
            modalTitle,
            onConfirm,
            onCancel,
            children,
            data
          } = this.props;

    return isVisible ? (
        <section className="skylight-wrapper">
          <div className="modal-overlay"></div>
          <div className="modal-dialog">
            <h2 className="modal-title">{modalTitle}</h2>
            {React.cloneElement(children, {
              onConfirm,
              onCancel,
              data
            })}
          </div>
        </section>
      ) : <div />;
  }
}

ModalLayout.propTypes = {
  isVisible : PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  onConfirm : PropTypes.func.isRequired,
  onCancel  : PropTypes.func.isRequired,
  children  : PropTypes.node.isRequired,
  data      : PropTypes.object
};

export default withModal(ModalLayout);
