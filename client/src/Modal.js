import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css"; 

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className = "modal-container"; 
  }

  useEffect(() => {
    let modalRoot = document.getElementById("modal");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal";
      document.body.appendChild(modalRoot);
    }
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div className="modal-content">{children}</div>, elRef.current);
};

export default Modal;