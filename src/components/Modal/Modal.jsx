import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.key === 'Escape') this.props.handleModal();
  };

  handleOverlay = e => {
    if (e.currentTarget === e.target) this.props.handleModal();
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlay}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleModal: PropTypes.func.isRequired,
};
