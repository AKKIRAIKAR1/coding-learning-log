import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Toast from "../components/Toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);
  const nav = useNavigate();

  const signup = async () => {
    if (!email || !password || !confirmPassword) {
      setToast({ msg: "All fields are required", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ msg: "Passwords do not match", type: "error" });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setToast({ msg: error.message, type: "error" });
    } else {
      setToast({ msg: "Signup successful. Please login.", type: "success" });
      setTimeout(() => nav("/"), 1200);
    }
  };

  return (
    <div className="auth-card">
      <BackButton />
      <h3>Create Account</h3>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={signup}>Create Account</button>

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Signup;
