import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, handleModal }) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    if (e.key === 'Escape') handleModal();
  };

  const handleOverlay = e => {
    if (e.currentTarget === e.target) handleModal();
  };

  return createPortal(
    <Overlay onClick={handleOverlay}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleModal: PropTypes.func.isRequired,
};
