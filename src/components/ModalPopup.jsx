
import { useEffect, useRef } from 'react';

import "./modalPopup.scss";

export const ModalPopup = ({ children, showPopup, setShowPopup }) => {

  const menuRef = useRef()
  useEffect(() => {
    if (showPopup) {
      let handler = (event) => {
        if (!menuRef.current.contains(event.target)) {
          setShowPopup(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });

  return (
    <div className="date-popup" ref={menuRef}>
      <div>{children}</div>
    </div>
  );
};
