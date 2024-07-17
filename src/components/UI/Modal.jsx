import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
export const Modal = ({ children, open, className = '', onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const modal = modalRef.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);
  console.log('onClose, ', onClose);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};
