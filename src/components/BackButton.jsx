import { useNavigate } from "react-router-dom";

function BackButton() {
  const nav = useNavigate();

  return (
    <button className="back-btn" onClick={() => nav(-1)}>
      ← Back
    </button>
  );
}

export default BackButton;
