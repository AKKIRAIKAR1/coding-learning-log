import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import BackButton from "../components/BackButton";
import Toast from "../components/Toast";

function AddSnippet() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    supabase.from("books").select("*").then(({ data }) => {
      setBooks(data || []);
    });
  }, []);

  const saveSnippet = async () => {
    const { error } = await supabase.from("snippets").insert([
      {
        title,
        book_id: bookId,
        code,
        description: desc,
        tags,
      },
    ]);

    if (error) {
      setToast({ msg: "Failed to save snippet", type: "error" });
    } else {
      setToast({ msg: "Snippet saved", type: "success" });
      setTitle("");
      setBookId("");
      setCode("");
      setDesc("");
      setTags("");
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h3>Add Snippet</h3>

      <input
        placeholder="Snippet name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
        <option value="">Select Book</option>
        {books.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <textarea
        rows="6"
        placeholder="Code snippet"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        placeholder="Tags (js,react)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button onClick={saveSnippet}>Save Snippet</button>

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

export default AddSnippet;
