import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/dashboard");
    });
  }, []);

  const login = async () => {
    if (!email || !password) {
      setToast({ msg: "Email and password required", type: "error" });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setToast({ msg: error.message, type: "error" });
    } else {
      setToast({ msg: "Login successful", type: "success" });
      nav("/dashboard");
    }
  };

  return (
    <div className="auth-card">
      <h3>Welcome Back 👋</h3>

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

      <button onClick={login}>Login</button>

      <button
        style={{ background: "transparent", color: "#818cf8" }}
        onClick={() => nav("/signup")}
      >
        Create new account
      </button>

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

export default Login;
