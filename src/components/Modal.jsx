import { useEffect } from "react";
import s from "./Modal.module.css";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`${s.modal} animate-fade`}>
        <div className={s.header}>
          <h2 className={s.title}>{title}</h2>
          <button className={s.close} onClick={onClose}>✕</button>
        </div>
        <div className={s.body}>{children}</div>
      </div>
    </div>
  );
}
