import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from "react";

function Modal({ onClose, children }) {

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div onClick={onClose} className={styles.close}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>, document.body
  );
}

export default Modal