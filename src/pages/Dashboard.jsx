import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Dashboard() {
  const nav = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    nav("/");
  };

  return (
    <div className="dashboard">
      <h2>📘 Coding Learning Log</h2>

      <button onClick={() => nav("/create-book")}>Create Book</button>
      <button onClick={() => nav("/add-snippet")}>Add Snippet</button>
      <button onClick={() => nav("/view-books")}>View Books</button>

      <button className="logout" onClick={logout}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
