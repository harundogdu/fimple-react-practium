import { useRef } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef(null);

  const handleModalClick = event => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal open" : ""}`}
      onClick={handleModalClick}
      ref={modalRef}
    >
      <div className='modal__content'>{children}</div>
    </div>
  );
}

export default Modal;