import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}

export default Toast;
