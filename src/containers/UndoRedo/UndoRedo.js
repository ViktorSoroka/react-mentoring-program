import React from 'react';
import PropTypes from 'prop-types';

import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';


const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

UndoRedo.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  canRedo: PropTypes.bool.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  canUndo: true,
  canRedo: true
});

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);
