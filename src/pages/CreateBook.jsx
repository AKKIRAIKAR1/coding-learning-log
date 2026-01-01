import { useState } from "react";
import { supabase } from "../supabase";
import BackButton from "../components/BackButton";
import Toast from "../components/Toast";

function CreateBook() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [toast, setToast] = useState(null);

  const saveBook = async () => {
    // ✅ validation
    if (!name.trim()) {
      setToast({ msg: "Book name cannot be empty", type: "error" });
      return;
    }

    const { error } = await supabase
      .from("books")
      .insert([{ name: name.trim(), priority }]);

    if (error) {
      setToast({ msg: "Failed to save book", type: "error" });
    } else {
      setToast({ msg: "Book saved", type: "success" });
      setName("");
      setPriority("Medium");
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h3>Create Book</h3>

      <input
        placeholder="Book name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button onClick={saveBook}>Save Book</button>

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

export default CreateBook;
