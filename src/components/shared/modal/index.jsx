import { useRef } from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  const modalRef = useRef(null);

  const handleModalClick = event => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? 'open' : ''}`}
      onClick={handleModalClick}
      ref={modalRef}
      id="modal"
    >
      <div className='modal__content'>
        {title && <h2 className='modal__content-title'>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
